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
