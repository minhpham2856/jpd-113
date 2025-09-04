// Tabs
const countingTab = document.getElementById("counting-tab");
const grammarTab = document.getElementById("grammar-tab");
const countingContent = document.getElementById("counting-content");
const grammarContent = document.getElementById("grammar-content");

countingTab.addEventListener("click", () => {
    countingTab.classList.add("active");
    grammarTab.classList.remove("active");
    countingContent.style.display = "block";
    grammarContent.style.display = "none";
});

grammarTab.addEventListener("click", () => {
    grammarTab.classList.add("active");
    countingTab.classList.remove("active");
    grammarContent.style.display = "block";
    countingContent.style.display = "none";
});

// collapsible helper for tables (counting)
function makeCollapsibleTable(caption, tbody, thead = null) {
    caption.style.cursor = "pointer";
    caption.addEventListener("click", () => {
        const isHidden = tbody.style.display === "none";
        tbody.style.display = isHidden ? "table-row-group" : "none";
        if (thead) thead.style.display = isHidden ? "table-header-group" : "none";
    });
    // start collapsed
    tbody.style.display = "none";
    if (thead) thead.style.display = "none";
}

// collapsible helper for divs (grammar)
function makeCollapsibleDiv(caption, content) {
    caption.style.cursor = "pointer";
    caption.addEventListener("click", () => {
        const isHidden = content.style.display === "none";
        content.style.display = isHidden ? "block" : "none";
    });
    content.style.display = "none"; // start collapsed
}

// expand/ collapse (grammar only)
const expandAllBtn = document.getElementById("expand-all");
const collapseAllBtn = document.getElementById("collapse-all");

expandAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".collapsible-content").forEach(c => c.style.display = "block");
});

collapseAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".collapsible-content").forEach(c => c.style.display = "none");
});

// counting
async function loadCounting() {
    const response = await fetch("data/counting.json");
    const data = await response.json();

    data.categories.forEach(cat => {
        const table = document.createElement("table");
        table.classList.add("kana-table");

        const caption = document.createElement("caption");
        caption.textContent = cat.title;
        table.appendChild(caption);

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Japanese", "Vietnamese"].forEach(h => {
            const th = document.createElement("th");
            th.textContent = h;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        cat.items.forEach(item => {
            const tr = document.createElement("tr");
            ["japanese", "vietnamese"].forEach(k => {
                const td = document.createElement("td");
                td.textContent = item[k];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        countingContent.appendChild(table);
        makeCollapsibleTable(caption, tbody, thead);
    });
}

// grammar
async function loadGrammar() {
    const response = await fetch("data/grammar.json");
    const data = await response.json();

    data.categories.forEach(cat => {
        const container = document.createElement("div");
        container.classList.add("collapsible-block");

        const caption = document.createElement("div");
        caption.textContent = cat.title;
        caption.style.fontWeight = "bold";
        caption.style.textAlign = "center";
        caption.style.fontSize = "1.05rem";
        caption.style.background = "#FFE0E9";
        caption.style.padding = "1rem";
        caption.style.marginTop = "2rem";
        container.appendChild(caption);

        const content = document.createElement("div");
        content.classList.add("collapsible-content");
        content.style.padding = "0.5rem";
        content.style.background = "#FFF8F0";

        cat.items.forEach(item => {
            const p = document.createElement("p");
            p.textContent = item;
            content.appendChild(p);
        });

        container.appendChild(content);
        grammarContent.appendChild(container);
        makeCollapsibleDiv(caption, content);
    });
}

loadCounting();
loadGrammar();
