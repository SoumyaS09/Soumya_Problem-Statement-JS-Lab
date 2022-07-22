class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }

        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> You scored: " + quiz.score + "</h2>";
    gameOverHTML += "<h2 id='percentage'> Percentage scored: " + (quiz.score / questions.length) * 100 + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("Dandia' is a popular dance of?", ["Punjab", "Gujarat","Tamil Nadu", "Maharashtra"], "Gujarat"),
    new Question("Mohiniattam dance from developed originally in which state??", ["Tamil Nadu", "Orissa", "Kerala", "Karnataka"], "Kerala"),
    new Question("Golden Temple is situated in?", ["New Delhi", "Agra","Mumbai", "Amritsar"], "Amritsar"),
    new Question("Grand Central Terminal, Park Avenue, New York is the world's?", ["largest railway station", "highest railway station", "longest railway station", "None of the above"], "largest railway station"),
    new Question("Teacher's Day' is observed on which of the date?", ["October 2", "November 14", "January 30", "September 5"], "September 5")
];

var quiz = new Quiz(questions);

populate();
