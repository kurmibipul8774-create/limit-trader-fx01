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
