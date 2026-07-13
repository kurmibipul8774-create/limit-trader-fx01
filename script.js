document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // SAVE TRADE
    // ==========================
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

            alert("✅ Trade Saved Successfully!");

            window.location.href = "history.html";
        });
    }

    // ==========================
    // HISTORY PAGE
    // ==========================
    const history = document.getElementById("history");

    if (history) {

        let trades = JSON.parse(localStorage.getItem("trades")) || [];

        if (trades.length === 0) {

            history.innerHTML = "<h3>No trades saved.</h3>";

        } else {

            trades.slice().reverse().forEach(function (trade) {

                history.innerHTML += `
                <div class="card">
                    <h3>${trade.pair}</h3>
                    <p><b>Date:</b> ${trade.date}</p>
                    <p><b>Session:</b> ${trade.session}</p>
                    <p><b>Bias:</b> ${trade.bias}</p>
                    <p><b>Result:</b> ${trade.result}</p>
                    <p><b>Profit:</b> $${trade.profit}</p>
                    <p><b>Risk:</b> ${trade.risk}%</p>
                    <p><b>R:R:</b> ${trade.rr}</p>
                    <p><b>A+:</b> ${trade.aplus}</p>
                    <p><b>Notes:</b> ${trade.notes}</p>
                </div><br>
                `;
            });
        }
    }

    // ==========================
    // DASHBOARD
    // ==========================
    if (document.getElementById("totalTrades")) {

        let trades = JSON.parse(localStorage.getItem("trades")) || [];

        document.getElementById("totalTrades").textContent = trades.length;

        let wins = trades.filter(t => t.result === "Win").length;

        document.getElementById("winRate").textContent =
            trades.length ? ((wins / trades.length) * 100).toFixed(1) + "%" : "0%";

        let totalProfit = trades.reduce((sum, t) => sum + Number(t.profit || 0), 0);

        document.getElementById("totalProfit").textContent = "$" + totalProfit;

        let totalRR = 0;

        trades.forEach(function (t) {
            if (t.rr && t.rr.includes(":")) {
                totalRR += Number(t.rr.split(":")[1]);
            }
        });

        document.getElementById("averageRR").textContent =
            trades.length ? (totalRR / trades.length).toFixed(2) : "0";

        let aplus = trades.filter(t => t.aplus === "Yes").length;

        document.getElementById("aPlus").textContent = aplus;

        let grossProfit = trades
            .filter(t => Number(t.profit) > 0)
            .reduce((a, b) => a + Number(b.profit), 0);

        let grossLoss = Math.abs(
            trades
            .filter(t => Number(t.profit) < 0)
            .reduce((a, b) => a + Number(b.profit), 0)
        );

        document.getElementById("profitFactor").textContent =
            grossLoss ? (grossProfit / grossLoss).toFixed(2) : "∞";
    }

});
