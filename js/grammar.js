document.addEventListener("DOMContentLoaded", () => {
    let grammarData = null;
    let viewMode = "counting";

    fetch("data/counting.json")
        .then(res => res.json())
        .then(counting => {
            fetch("data/grammar.json")
                .then(res => res.json())
                .then(grammar => {
                    grammarData = {counting, grammar};
                    renderCounting(grammarData.counting);
                });
        });

    document.getElementById("toggle-view").addEventListener("click", () => {
        if(viewMode === "counting") {
            renderGrammar(grammarData.grammar);
            viewMode = "grammar";
            document.getElementById("toggle-view").textContent = "View Counting";
        } else {
            renderCounting(grammarData.counting);
            viewMode = "counting";
            document.getElementById("toggle-view").textContent = "Grammar Structures";
        }
    });
});

function clearTables() {
    document.getElementById("grammar-tables").innerHTML = "";
}

function renderCounting(data) {
    clearTables();
    const row = document.createElement("div");
    row.classList.add("grammar-row");

    data.categories.forEach(cat => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `<h2 class="text-header">${cat.title}</h2>
            <table>
                <thead><tr><th>Japanese</th><th>Vietnamese</th></tr></thead>
                <tbody></tbody>
            </table>`;

        const tbody = col.querySelector("tbody");
        cat.items.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.japanese}</td><td>${item.vietnamese}</td>`;
            tbody.appendChild(tr);
        });

        row.appendChild(col);
    });

    document.getElementById("grammar-tables").appendChild(row);
}

function renderGrammar(data) {
    clearTables();
    const row = document.createElement("div");
    row.classList.add("grammar-row");

    data.categories.forEach(cat => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `<h2 class="text-header">${cat.title}</h2>${cat.items.map(i => `<p>${i}</p>`).join("")}`;

        row.appendChild(col);
    });

    document.getElementById("grammar-tables").appendChild(row);
}
