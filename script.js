document.addEventListener("DOMContentLoaded", () => {

    // SAVE TRADE
    const saveBtn = document.getElementById("saveTrade");

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {

            let trades = JSON.parse(localStorage.getItem("trades")) || [];

            trades.push({
                pair: pair.value,
                date: date.value,
                session: session.value,
                bias: bias.value,
                setup: setup.value,
                setupType: setupType.value,
                liquidity: liquidity.value,
                risk: risk.value,
                rr: rr.value,
                result: result.value,
                profit: Number(profit.value) || 0,
                aplus: aplus.value,
                notes: notes.value
            });

            localStorage.setItem("trades", JSON.stringify(trades));

            alert("Trade Saved!");
            location.href = "history.html";
        });
    }

    // HISTORY PAGE
    const history = document.getElementById("history");

    if (history) {

        let trades = JSON.parse(localStorage.getItem("trades")) || [];

        if (trades.length === 0) {
            history.innerHTML = "<h3>No trades saved.</h3>";
        } else {

            trades.reverse().forEach(trade => {

                history.innerHTML += `
                <div class="card">
                    <h3>${trade.pair}</h3>
                    <p><b>Date:</b> ${trade.date}</p>
                    <p><b>Session:</b> ${trade.session}</p>
                    <p><b>Bias:</b> ${trade.bias}</p>
                    <p><b>Result:</b> ${trade.result}</p>
                    <p><b>Profit:</b> $${trade.profit}</p>
                    <p><b>R:R:</b> ${trade.rr}</p>
                    <p><b>Notes:</b> ${trade.notes}</p>
                </div><br>`;
            });

        }
    }

});
const totalTrades = document.getElementById("totalTrades");

if (totalTrades) {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    document.getElementById("totalTrades").textContent = trades.length;

    let wins = trades.filter(t => t.result === "Win").length;

    document.getElementById("winRate").textContent =
        trades.length ? ((wins / trades.length) * 100).toFixed(1) + "%" : "0%";

    let profit = trades.reduce((sum, t) => sum + Number(t.profit || 0), 0);
    document.getElementById("totalProfit").textContent = "$" + profit;

    let aplus = trades.filter(t => t.aplus === "Yes").length;
    document.getElementById("aPlus").textContent = aplus;

    let rr = 0;
    trades.forEach(t => {
        if (t.rr.includes(":")) {
            rr += Number(t.rr.split(":")[1]);
        }
    });

    document.getElementById("averageRR").textContent =
        trades.length ? (rr / trades.length).toFixed(2) : "0";

    document.getElementById("profitFactor").textContent = "Coming Soon";
}
