document.addEventListener("DOMContentLoaded", () => {
    let kanaData = [];
    let vocabGrammarData = [];

    Promise.all([
        fetch("data/kana_test.json").then(res => res.json()),
        fetch("data/v_g_test.json").then(res => res.json())
    ])
        .then(([kana, vocabGrammar]) => {
            kanaData = kana;
            vocabGrammarData = vocabGrammar;

            // Add event listeners for the new buttons
            document.querySelectorAll(".view-toggle button").forEach(btn => {
                btn.addEventListener("click", () => {
                    const mode = btn.dataset.mode;
                    if (mode === "kana") {
                        renderKana();
                    } else if (mode === "vocab-grammar") {
                        renderVocabGrammar();
                    }
                });
            });
        })
        .catch(err => console.error("Error loading new test data:", err));

    function renderKana() {
        const container = document.getElementById("tests-container");
        container.innerHTML = ''; // Clear previous content

        const question = getRandomItem(kanaData);
        if (!question) return;

        const box = document.createElement("div");
        box.classList.add("test-box");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        box.appendChild(questionText);

        const choicesDiv = document.createElement("div");
        choicesDiv.classList.add("choices");
        question.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(button, choice, question.answer, choicesDiv));
            choicesDiv.appendChild(button);
        });
        box.appendChild(choicesDiv);

        const newBtn = document.createElement("button");
        newBtn.textContent = "Next Question";
        newBtn.classList.add("next-question-btn");
        newBtn.style.display = "none"; // Hidden until answer is checked
        newBtn.addEventListener("click", renderKana);
        box.appendChild(newBtn);

        container.appendChild(box);
    }

    function renderVocabGrammar() {
        const container = document.getElementById("tests-container");
        container.innerHTML = ''; // Clear previous content

        const question = getRandomItem(vocabGrammarData);
        if (!question) return;

        const box = document.createElement("div");
        box.classList.add("test-box");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        box.appendChild(questionText);

        const choicesDiv = document.createElement("div");
        choicesDiv.classList.add("choices");
        question.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(button, choice, question.answer, choicesDiv));
            choicesDiv.appendChild(button);
        });
        box.appendChild(choicesDiv);

        const newBtn = document.createElement("button");
        newBtn.textContent = "Next Question";
        newBtn.classList.add("next-question-btn");
        newBtn.style.display = "none"; // Hidden until answer is checked
        newBtn.addEventListener("click", renderVocabGrammar);
        box.appendChild(newBtn);

        container.appendChild(box);
    }

    function checkAnswer(clickedButton, selectedAnswer, correctAnswer, choicesContainer) {
        if (selectedAnswer === correctAnswer) {
            clickedButton.style.backgroundColor = "lightgreen";
        } else {
            clickedButton.style.backgroundColor = "lightcoral";
            // Highlight the correct answer
            Array.from(choicesContainer.children).forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.style.backgroundColor = "lightgreen";
                }
            });
        }
        // Disable all choice buttons after an answer is selected
        Array.from(choicesContainer.children).forEach(button => {
            button.disabled = true;
        });
        // Show the "Next Question" button
        choicesContainer.nextElementSibling.style.display = "block";
    }

    let lastKanaQuestion = null;
    let lastVocabGrammarQuestion = null;

    function getRandomItem(arr) {
        if (arr.length === 0) return null;
        if (arr.length === 1) return arr[0];

        let item;
        let lastQuestionVar;

        if (arr === kanaData) {
            lastQuestionVar = lastKanaQuestion;
        } else if (arr === vocabGrammarData) {
            lastQuestionVar = lastVocabGrammarQuestion;
        }

        do {
            item = arr[Math.floor(Math.random() * arr.length)];
        } while (item === lastQuestionVar);

        if (arr === kanaData) {
            lastKanaQuestion = item;
        } else if (arr === vocabGrammarData) {
            lastVocabGrammarQuestion = item;
        }
        return item;
    }
});