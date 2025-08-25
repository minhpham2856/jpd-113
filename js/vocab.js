document.addEventListener("DOMContentLoaded", () => {
    fetch("data/vocab.json")
        .then(response => response.json())
        .then(data => {
            loadUnit("unit1", data.unit1);
            loadUnit("unit2", data.unit2);
            loadUnit("unit3", data.unit3);
        })
        .catch(err => console.error("Error loading vocab.json:", err));
});

function loadUnit(unitId, vocabList) {
    const tbody = document.querySelector(`#${unitId}-table tbody`);
    vocabList.forEach(word => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${word.kanji}</td>
      <td>${word.hiragana}</td>
      <td>${word.vietnamese}</td>
    `;
        tbody.appendChild(row);
    });
}
