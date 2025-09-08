document.addEventListener("DOMContentLoaded", () => {
    let vocabData = null;
    let viewMode = "unit";

    fetch("data/vocab.json")
        .then(res => res.json())
        .then(data => {
            vocabData = data;
            renderUnits(vocabData);
        });

    document.getElementById("toggle-view").addEventListener("click", () => {
        if(viewMode === "unit") {
            renderTypes(vocabData.types);
            viewMode = "type";
            document.getElementById("toggle-view").textContent = "View by Unit";
        } else {
            renderUnits(vocabData);
            viewMode = "unit";
            document.getElementById("toggle-view").textContent = "View by Topics";
        }
    });
});

function clearTables() {
    document.getElementById("vocab-tables").innerHTML = "";
}

function renderUnits(data) {
    clearTables();
    const row = document.createElement("div");
    row.classList.add("vocab-row", "vocab-units-row");

    ["unit1","unit2","unit3"].forEach(unitKey => {
        if(!data[unitKey]) return;

        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `<h2 class="text-header">${unitKey.replace("unit","Unit ")}</h2>
            <table>
                <thead>
                    <tr><th>Kanji</th><th>Kana</th><th>Vietnamese</th></tr>
                </thead>
                <tbody></tbody>
            </table>`;

        const tbody = col.querySelector("tbody");
        data[unitKey].forEach(word => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${word.kanji}</td><td>${word.kana}</td><td>${word.vietnamese}</td>`;
            tbody.appendChild(tr);
        });

        row.appendChild(col);
    });

    document.getElementById("vocab-tables").appendChild(row);
}

function renderTypes(types) {
    clearTables();
    const row = document.createElement("div");
    row.classList.add("vocab-row", "vocab-topics-row");

    Object.keys(types).forEach(type => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `<h2 class="text-header">${capitalize(type)}</h2>
            <table>
                <thead>
                    <tr><th>Kanji</th><th>Kana</th><th>Vietnamese</th></tr>
                </thead>
                <tbody></tbody>
            </table>`;

        const tbody = col.querySelector("tbody");
        types[type].forEach(word => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${word.kanji}</td><td>${word.kana}</td><td>${word.vietnamese}</td>`;
            tbody.appendChild(tr);
        });

        row.appendChild(col);
    });

    document.getElementById("vocab-tables").appendChild(row);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
