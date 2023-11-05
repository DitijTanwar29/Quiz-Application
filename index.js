document.addEventListener("DOMContentLoaded", () => {
    let quizData;
    let userScore = 0;
    let currentQuestionIndex = 0;
    let isQuestionAnswered = false;

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const scoreElement = document.getElementById("score");
    const scoreValueElement = document.getElementById("score-value");
    const restartButton = document.getElementById("restart-button");
    const messageElement = document.getElementById("message");

    function showQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsElement.innerHTML = '';

            currentQuestion.options.forEach(option => {
                const li = document.createElement("li");
                li.textContent = option;
                li.addEventListener("click", () => selectOption(li, option));
                optionsElement.appendChild(li);
            });

            nextButton.disabled = true;
            isQuestionAnswered = false;
        } else {
            showScore();
            nextButton.style.display = "none";
            restartButton.style.display = "block";
        }
    }

    function selectOption(optionElement, selectedOption) {
        if (!isQuestionAnswered) {
            const currentQuestion = quizData[currentQuestionIndex];
            if (selectedOption === currentQuestion.answer) {
                userScore++;
            }
            isQuestionAnswered = true;
            optionElement.style.background = "linear-gradient(140deg, #792623, #67d3d3)";
            nextButton.disabled = false;
        }
    }

    nextButton.addEventListener("click", () => {
        if (isQuestionAnswered) {
            currentQuestionIndex++;
            showQuestion();
        }
    });

    restartButton.addEventListener("click", () => {
        userScore = 0;
        isQuestionAnswered = false;
        scoreElement.style.display = "none";
        nextButton.style.display = "block";
        restartButton.style.display = "none";
        resetOptionsBackground();
        currentQuestionIndex = 0;
        showQuestion();
    });

    function resetOptionsBackground() {
        const optionElements = optionsElement.getElementsByTagName("li");
        for (const option of optionElements) {
            option.style.backgroundColor = "";
        }
    }

    // Load quiz data from JSON file
    fetch('quizData.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            showQuestion();
        })
        .catch(error => console.error('Error loading quiz data:', error));

    function showScore() {
        scoreValueElement.textContent = userScore;
        scoreElement.style.display = "block";

        // Add personalized message based on the user's score
        let message = "";
        if (userScore === quizData.length) {
            message = "Congratulations! You got a perfect score!";
        } else if (userScore >= quizData.length / 2) {
            message = "Great job! You did well!";
        } else {
            message = "You can try again to improve your score.";
        }
        messageElement.textContent = message;
    }
});
