// ===============================
// LIMIT TRADER FX
// PART 1 - SAVE & DASHBOARD
// ===============================

// ---------- SAVE TRADE ----------

const saveBtn = document.getElementById("saveTrade");

if (saveBtn) {

saveBtn.addEventListener("click", function () {

let trades = JSON.parse(localStorage.getItem("trades")) || [];

const trade = {

pair: document.getElementById("pair").value,

date: document.getElementById("date").value,

session: document.getElementById("session").value,

bias: document.getElementById("bias").value,

setup: document.getElementById("setup").value,

setupType: document.getElementById("setupType").value,

liquidity: document.getElementById("liquidity").value,

risk: document.getElementById("risk").value,

rr: document.getElementById("rr").value,

result: document.getElementById("result").value,

profit: Number(document.getElementById("profit").value) || 0,

aplus: document.getElementById("aplus").value,

notes: document.getElementById("notes").value

};

trades.push(trade);

localStorage.setItem("trades", JSON.stringify(trades));

alert("Trade Saved Successfully!");

window.location.href = "index.html";

});

}

// ---------- DASHBOARD ----------

if (document.getElementById("totalTrades")) {

let trades = JSON.parse(localStorage.getItem("trades")) || [];

document.getElementById("totalTrades").innerText = trades.length;

// Wins
let wins = trades.filter(t => t.result === "Win").length;

// Win Rate
let winRate = trades.length
? ((wins / trades.length) * 100).toFixed(1)
: 0;

document.getElementById("winRate").innerText = winRate + "%";

// Total Profit
let totalProfit = trades.reduce((sum, t) => sum + Number(t.profit), 0);

document.getElementById("totalProfit").innerText =
"$" + totalProfit.toFixed(2);

// Average RR
let rrTotal = 0;

trades.forEach(t => {

if (t.rr.includes(":")) {

rrTotal += Number(t.rr.split(":")[1]);

}

});

let avgRR = trades.length ? (rrTotal / trades.length).toFixed(2) : 0;

document.getElementById("averageRR").innerText = avgRR;

// A+ Setups
let aplus = trades.filter(t => t.aplus === "Yes").length;

document.getElementById("aPlus").innerText = aplus;

// Profit Factor
let grossProfit = 0;
let grossLoss = 0;

trades.forEach(t => {

if (Number(t.profit) >= 0)

grossProfit += Number(t.profit);

else

grossLoss += Math.abs(Number(t.profit));

});

let pf = grossLoss == 0
? grossProfit.toFixed(2)
: (grossProfit / grossLoss).toFixed(2);

document.getElementById("profitFactor").innerText = pf;

}

// ===============================
// PART 2 - TRADE HISTORY
// ===============================

if (document.getElementById("history")) {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    let history = document.getElementById("history");
    history.innerHTML = "";

    if (trades.length === 0) {

        history.innerHTML = `
        <div class="card">
            <h2>No Trades Found</h2>
        </div>
        `;

    } else {

        trades.forEach(function (trade, index) {

            history.innerHTML += `
            <div class="card">

                <h2>${trade.pair}</h2>

                <p><b>Date:</b> ${trade.date}</p>

                <p><b>Session:</b> ${trade.session}</p>

                <p><b>Bias:</b> ${trade.bias}</p>

                <p><b>Setup:</b> ${trade.setupType}</p>

                <p><b>Liquidity:</b> ${trade.liquidity}</p>

                <p><b>Risk:</b> ${trade.risk}%</p>

                <p><b>R:R:</b> ${trade.rr}</p>

                <p><b>Result:</b> ${trade.result}</p>

                <p><b>Profit:</b> $${trade.profit}</p>

                <p><b>A+ Setup:</b> ${trade.aplus}</p>

                <p><b>Notes:</b><br>${trade.notes}</p>

                <button onclick="deleteTrade(${index})">
                    🗑 Delete Trade
                </button>

            </div>
            `;

        });

    }

}

// ===============================
// DELETE TRADE
// ===============================

function deleteTrade(index) {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    trades.splice(index, 1);

    localStorage.setItem("trades", JSON.stringify(trades));

    location.reload();

}

// ===============================
// PART 3 - ANALYTICS & DASHBOARD
// ===============================

function updateDashboard() {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    // Total Trades
    document.getElementById("totalTrades").innerText = trades.length;

    // Wins
    let wins = trades.filter(t => t.result === "Win").length;

    // Win Rate
    let winRate = trades.length
        ? ((wins / trades.length) * 100).toFixed(1)
        : 0;

    document.getElementById("winRate").innerText = winRate + "%";

    // Total Profit
    let totalProfit = trades.reduce((sum, trade) => {

        return sum + Number(trade.profit || 0);

    }, 0);

    document.getElementById("totalProfit").innerText =
        "$" + totalProfit.toFixed(2);

    // Average RR
    let rrTotal = 0;

    trades.forEach(trade => {

        if (trade.rr && trade.rr.includes(":")) {

            rrTotal += Number(trade.rr.split(":")[1]);

        }

    });

    let averageRR = trades.length
        ? (rrTotal / trades.length).toFixed(2)
        : 0;

    document.getElementById("averageRR").innerText = averageRR;

    // A+ Setups
    let aPlus = trades.filter(t => t.aplus === "Yes").length;

    document.getElementById("aPlus").innerText = aPlus;

    // Profit Factor
    let grossProfit = 0;
    let grossLoss = 0;

    trades.forEach(trade => {

        if (Number(trade.profit) >= 0) {

            grossProfit += Number(trade.profit);

        } else {

            grossLoss += Math.abs(Number(trade.profit));

        }

    });

    let profitFactor = grossLoss === 0
        ? grossProfit.toFixed(2)
        : (grossProfit / grossLoss).toFixed(2);

    document.getElementById("profitFactor").innerText = profitFactor;

}

// Run dashboard only if we're on the dashboard page
if (document.getElementById("totalTrades")) {
    updateDashboard();
}
