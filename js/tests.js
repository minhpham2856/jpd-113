document.addEventListener("DOMContentLoaded", () => {
    let readingData = [];
    let pictureData = {};
    let noPictureData = [];
    let currentMode = "reading";
    let timerInterval = null;
    let timerSeconds = 0;
    let lastItem, lastKey;

    Promise.all([
        fetch("data/reading.json").then(res => res.json()),
        fetch("data/picture.json").then(res => res.json()),
        fetch("data/no_picture.json").then(res => res.json())
    ])
        .then(([reading, picture, noPicture]) => {
            readingData = reading;
            pictureData = picture;
            noPictureData = noPicture;

            loadMode("reading");

            document.querySelectorAll(".view-toggle button").forEach(btn => {
                btn.addEventListener("click", () => {
                    loadMode(btn.dataset.mode);
                });
            });
        })
        .catch(err => console.error("Error loading test data:", err));

    function loadMode(mode) {
        currentMode = mode;
        document.getElementById("tests-container").innerHTML = "";

        if (timerInterval) clearInterval(timerInterval);
        if (mode === "reading") {
            renderReading();
        } else if (mode === "pictured") {
            renderPictured();
        } else if (mode === "no-picture") {
            renderNoPicture();
        }
    }

    function startTimer(limit, colorClass) {
        timerSeconds = 0;
        const timerEl = document.getElementById("timer");
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerEl.textContent = timerSeconds + "s";

            if (colorClass && timerSeconds >= limit) {
                timerEl.classList.add(colorClass);
            }
        }, 1000);
    }

    function resetTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerSeconds = 0;
    }

    function renderReading() {
        const container = document.getElementById("tests-container");
        const box = document.createElement("div");
        box.classList.add("test-box");

        const text = document.createElement("p");
        text.textContent = getRandomItem(readingData);

        const controls = document.createElement("div");
        controls.classList.add("test-controls");

        const newBtn = document.createElement("button");
        newBtn.textContent = "New";
        newBtn.addEventListener("click", () => {
            text.textContent = getRandomItem(readingData);
            resetTimer();
            timerEl.className = "";
            timerEl.textContent = "0s";
            startTimer(20, "green");
        });

        const timerEl = document.createElement("div");
        timerEl.id = "timer";
        timerEl.textContent = "0s";

        controls.appendChild(newBtn);
        controls.appendChild(timerEl);
        box.appendChild(text);
        box.appendChild(controls);
        container.appendChild(box);
        startTimer(20, "green");
    }

    function renderPictured() {
        const container = document.getElementById("tests-container");
        const wrapper = document.createElement("div");
        wrapper.classList.add("test-wrapper");

        // left
        const questionsDiv = document.createElement("div");
        questionsDiv.classList.add("test-questions");

        const imgKey = getRandomKey(pictureData);
        const questions = pictureData[imgKey];

        questions.forEach(q => {
            const p = document.createElement("p");
            p.textContent = q;
            questionsDiv.appendChild(p);
        });

        // right
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("test-image");

        const img = document.createElement("img");
        img.src = "images/" + imgKey + ".png";
        img.alt = imgKey;
        imageDiv.appendChild(img);

        wrapper.appendChild(questionsDiv);
        wrapper.appendChild(imageDiv);

        const controls = document.createElement("div");
        controls.classList.add("test-controls");

        const newBtn = document.createElement("button");
        newBtn.textContent = "New";
        newBtn.addEventListener("click", () => {
            resetTimer();
            loadMode("pictured");
        });

        const timerEl = document.createElement("div");
        timerEl.id = "timer";
        timerEl.textContent = "0s";

        controls.appendChild(newBtn);
        controls.appendChild(timerEl);

        container.appendChild(wrapper);
        container.appendChild(controls);

        startTimer(null, null);
    }

    function renderNoPicture() {
        const container = document.getElementById("tests-container");
        const box = document.createElement("div");
        box.classList.add("test-box");

        const p = document.createElement("p");
        p.textContent = getRandomItem(noPictureData);
        box.appendChild(p);

        const controls = document.createElement("div");
        controls.classList.add("test-controls");

        const newBtn = document.createElement("button");
        newBtn.textContent = "New";
        newBtn.addEventListener("click", () => {
            p.textContent = getRandomItem(noPictureData);
            resetTimer();
            timerEl.className = "";
            startTimer(10, "red");
        });

        const timerEl = document.createElement("div");
        timerEl.id = "timer";
        timerEl.textContent = "0s";

        controls.appendChild(newBtn);
        controls.appendChild(timerEl);
        box.appendChild(controls);
        container.appendChild(box);
        timerEl.textContent = "0s";
        startTimer(10, "red");
    }

    function getRandomItem(arr) {
        if (arr.length <= 1) return arr[0];
        let item;
        do {
            item = arr[Math.floor(Math.random() * arr.length)];
        } while (item === lastItem);
        lastItem = item;
        return item;
    }

    function getRandomKey(obj) {
        const keys = Object.keys(obj);
        if (keys.length <= 1) return keys[0];
        let key;
        do {
            key = keys[Math.floor(Math.random() * keys.length)];
        } while (key === lastKey);
        lastKey = key;
        return key;
    }

});

const buttons = document.querySelectorAll(".view-toggle button");
buttons[0].classList.add("active");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

