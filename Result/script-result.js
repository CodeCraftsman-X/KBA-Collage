document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const classSelector = document.getElementById("class-selector");
    const rollNumberInput = document.getElementById("roll-number");
    const resultContainer = document.getElementById("result-display");

    const studentName = document.getElementById("student-name");
    const studentClass = document.getElementById("student-class");
    const studentRoll = document.getElementById("student-roll");
    const studentTotal = document.getElementById("student-total");
    const studentRank = document.getElementById("student-rank");
    const studentGrade = document.getElementById("student-grade");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const selectedClass = classSelector.value;
        const rollNumber = rollNumberInput.value;

        fetch('/Result/result.txt')
            .then(response => response.text())
            .then(data => {
                const results = parseResults(data);
                const studentResult = results.find(result => result.class === selectedClass && result.roll === rollNumber);
                
                if (studentResult) {
                    displayResult(studentResult);
                } else {
                    resultContainer.style.display = "block";
                    studentName.textContent = "Result not found.";
                    studentClass.textContent = "";
                    studentRoll.textContent = "";
                    studentTotal.textContent = "";
                    studentRank.textContent = "";
                    studentGrade.textContent = "";
                }
            })
            .catch(error => {
                console.error("Error fetching the results:", error);
                resultContainer.style.display = "block";
                studentName.textContent = "An error occurred while fetching the results.";
                studentClass.textContent = "";
                studentRoll.textContent = "";
                studentTotal.textContent = "";
                studentRank.textContent = "";
                studentGrade.textContent = "";
            });
    });

    function parseResults(data) {
        const lines = data.split('\n');
        return lines.map(line => {
            const [classNum, roll, name, score1, score2, score3, score4, total, rank, grade] = line.split(',');
            return {
                class: classNum,
                roll: roll,
                name: name,
                scores: [parseInt(score1, 10), parseInt(score2, 10), parseInt(score3, 10), parseInt(score4, 10)],
                total: parseInt(total, 10),
                rank: parseInt(rank, 10),
                grade: grade
            };
        });
    }

    function displayResult(result) {
        resultContainer.style.display = "block";
        studentName.textContent = `Result for ${result.name}`;
        studentClass.textContent = `Class: ${result.class}`;
        studentRoll.textContent = `Roll Number: ${result.roll}`;
        studentTotal.textContent = `Total Number: ${result.total}`;
        studentRank.textContent = `Rank: ${result.rank}`;
        studentGrade.textContent = `Grade: ${result.grade}`;
    }
});
