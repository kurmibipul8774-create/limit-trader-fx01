// Save Trade

document.addEventListener("DOMContentLoaded", function () {

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

});