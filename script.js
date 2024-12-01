

// Labels and coordinates
const labels = [
    { name: "Roof Hatch", coords: [171, 130, 245, 154] },
    { name: "Pantograph", coords: [280, 131, 438, 186] },
    { name: "Machine Room Access Door", coords: [398, 230, 435, 312] },
    { name: "Roof No. 7 Pantograph", coords: [250, 186, 472, 218] },
    { name: "Roof No. 6 - Diesel Engine (DE) 2 Silencer", coords: [482, 141, 570, 209] },
    { name: "Roof No. 5 - Diesel Engine (DE) 2 Cooling Unit", coords: [582, 139, 733, 162] },
    { name: "Roof No. 4 - Converter (CON) and Transformer (TRA) Cooling Unit", coords: [762, 139, 889, 167] },
    { name: "Roof No. 3 - Diesel Engine (DE) 1 Cooling Unit", coords: [934, 137, 1086, 160] },
    { name: "Machine Room Service Hatch", coords: [998, 224, 1040, 317] },
    { name: "Roof No. 2 - Diesel Engine (DE) 1 Silencer", coords: [1094, 134, 1186, 163] },
    { name: "Roof No. 1 - Traction Motor Blower (TMB) Intake", coords: [1209, 136, 1261, 163] },
    { name: "Layover Alarm Light", coords: [1267, 241, 1291, 263] },
    { name: "Brake Indicator Light", coords: [1267, 216, 1292, 234] },
    { name: "Cab Door", coords: [1300, 214, 1344, 320] },
    { name: "Side Window", coords: [1354, 215, 1375, 263] },
    { name: "Rear View Mirror", coords: [1386, 217, 1396, 262] },
    { name: "Filling Aperture For Sand, Front", coords: [1406, 261, 1430, 303] },
    { name: "Coupler, Front", coords: [1475, 347, 1517, 376] },
    { name: "Coupler, Rear", coords: [119, 351, 159, 396] },
    { name: "Filling Aperture For Sand, Rear", coords: [192, 275, 220, 304] },
    { name: "Snow Plow. Two ATC antennas are mounted behind snow plow.", coords: [1457, 389, 1492, 414] },
    { name: "ACSES Antenna", coords: [1396, 380, 1435, 416] },
    { name: "Truck, Front", coords: [1098, 363, 1358, 425] },
    { name: "Truck, Rear", coords: [294, 368, 545, 426] },
    { name: "Traction Rod, Rear", coords: [570, 384, 647, 412] },
    { name: "Traction Rod, Front", coords: [997, 391, 1079, 416] },
    { name: "VC/PB Antenna", coords: [1023, 361, 1076, 383] },
    { name: "Digital Fuel Gauge for Tank 1", coords: [1009, 729, 1037, 764] },
    { name: "Fuel Sight Glass for Tank 1", coords: [1002, 772, 1034, 827] },
    { name: "Fuel Fill Port for Tank 1", coords: [933, 674, 997, 774] },
    { name: "Fuel Fill Port for Tank 2", coords: [627, 673, 701, 775] },
    { name: "Fuel Sight Glass for Tank 2", coords: [599, 774, 624, 830] },
    { name: "Digital Fuel Gauge for Tank 2", coords: [599, 737, 619, 760] },
    { name: "Fuel Tank 1", coords: [902, 361, 986, 395] },
    { name: "Fuel Tank 2", coords: [679, 372, 759, 410] },
    { name: "Transformer", coords: [775, 361, 878, 399] },
    { name: "Converter Air Intake Filters", coords: [777, 257, 883, 307] },
];




let currentIndex = 0;
const missedLabels = []; // Track missed labels
let correctCount = 0;
let incorrectCount = 0;

// Shuffle the labels array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle labels before starting the quiz
shuffle(labels);

// Set the initial question
function setQuestion() {
    if (currentIndex < labels.length) {
        document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;
    } else {
        endQuiz();
    }
}

// Add a highlight for correct or incorrect answers
function addHighlight(coords, container, color, label = null) {
    const diagram = document.getElementById("diagram");
    const scaleX = diagram.clientWidth / diagram.naturalWidth;
    const scaleY = diagram.clientHeight / diagram.naturalHeight;

    const x1 = coords[0] * scaleX;
    const y1 = coords[1] * scaleY;
    const x2 = coords[2] * scaleX;
    const y2 = coords[3] * scaleY;

    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    highlight.style.left = `${x1}px`;
    highlight.style.top = `${y1}px`;
    highlight.style.width = `${x2 - x1}px`;
    highlight.style.height = `${y2 - y1}px`;
    highlight.style.borderColor = color;
    highlight.style.backgroundColor = color === "green" ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)";

    if (label) {
        highlight.addEventListener("mouseover", () => {
            label.style.display = "block";
            label.style.left = `${x2 + 5}px`; // Position label to the right of the highlight
            label.style.top = `${y1}px`; // Align vertically
        });
        highlight.addEventListener("mouseout", () => {
            label.style.display = "none";
        });
    }

    container.appendChild(highlight);
    return highlight; // Return the highlight for additional controls
}

// End the quiz and display the summary
function endQuiz() {
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");

    const score = ((correctCount / labels.length) * 100).toFixed(2); // Calculate score percentage

    questionElement.textContent = "Quiz Completed!";
    feedbackElement.innerHTML = `
        <p>Score: ${score}%</p>
        <p>Correct: ${correctCount}</p>
        <p>Incorrect: ${incorrectCount}</p>
        <p>Missed Labels:</p>
        <ul>
            ${missedLabels
                .map(
                    (label) =>
                        `<li class="missed-label" data-label="${label.name}">${label.name}</li>`
                )
                .join("")}
        </ul>
    `;

    // Highlight missed areas in red when hovered and show labels
    const missedLabelElements = document.querySelectorAll(".missed-label");
    missedLabelElements.forEach((element) => {
        const label = labels.find((l) => l.name === element.dataset.label);
        let tempHighlight = null; // Track the temporary highlight
        let tempLabel = null; // Track the temporary label
        element.addEventListener("mouseover", () => {
            tempHighlight = addHighlight(label.coords, diagramContainer, "red");
            tempLabel = document.createElement("div");
            tempLabel.classList.add("label");
            tempLabel.textContent = label.name;
            tempLabel.style.left = `${tempHighlight.style.left}`;
            tempLabel.style.top = `${parseInt(tempHighlight.style.top) + 20}px`; // Below the highlight
            diagramContainer.appendChild(tempLabel);
        });
        element.addEventListener("mouseout", () => {
            if (tempHighlight) tempHighlight.remove(); // Remove the highlight
            if (tempLabel) tempLabel.remove(); // Remove the label
        });
    });
}

// Start the quiz
setQuestion();

function checkAnswer(isCorrect) {
    const feedback = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");
    const currentLabel = labels[currentIndex];

    if (isCorrect) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        correctCount++;

        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = currentLabel.name;
        label.style.display = "none";

        addHighlight(currentLabel.coords, diagramContainer, "green", label);
        diagramContainer.appendChild(label);
    } else {
        feedback.textContent = "Incorrect! Moving to the next label.";
        feedback.style.color = "red";
        incorrectCount++;
        missedLabels.push(currentLabel);
    }

    currentIndex++;
    setQuestion();
}

const diagram = document.getElementById("diagram");
diagram.addEventListener("click", (event) => {
    const scaleX = diagram.naturalWidth / diagram.clientWidth;
    const scaleY = diagram.naturalHeight / diagram.clientHeight;

    const x = Math.round(event.offsetX * scaleX);
    const y = Math.round(event.offsetY * scaleY);

    const coords = labels[currentIndex].coords;

    // Check if the click is within the bounds
    const isCorrect =
        x >= coords[0] && x <= coords[2] && y >= coords[1] && y <= coords[3];

    checkAnswer(isCorrect);
});
