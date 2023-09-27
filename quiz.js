let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


const quizArray = [
    {
        id: "0",
        question: "Who is the highest goalscorer in the world?",
        options: ["CR7", "Messi", "Zidane", "Cryuff"],
        correct: "CR7",
    },
    {
        id: "1",
        question: "Which is the best anime character?",
        options: ["Naruto", "Luffy", "beteljuice", "KP oli"],
        correct: "Luffy",
    },
    {
        id: "2",
        question: "Which is the best IT company in Nepal?",
        options: ["Cotiviti", "Deerwalk", "Cedargate", "F1soft"],
        correct: "Cotiviti",
    },
    {
        id: "3",
        question: "What is the best bear?",
        options: ["Black bear", "Brown bear", "Polar bear", "Dwight Schrute"],
        correct: "Dwight Schrute",
    },
    {
        id: "4",
        question: "Which is thes best feeling in the world?",
        options: ["Friendship", "Hatred", "Love", "Loneliness"],
        correct: "Love",
    },
    {
        id: "5",
        question: "Which is the highest selling album?",
        options: ["Back in black", "Thriller", "Rumours", "HotelCalifornia"],
        correct: "Thriller",
    }, {
        id: "6",
        question: "What is the fastest animal on land",
        options: ["Cheetah", "Lion", "Humans", "Horse"],
        correct: "Cheetah",
    },
    {
        id: "7",
        question: "The highest ratest movie in the world is?",
        options: ["ShawShank", "GreenMile", "HailMary", "Casablanca"],
        correct: "ShawShank",
    },
    {
        id: "8",
        question: "Wha the tallest mountain",
        options: ["IceTall", "Kilimanjaro", "K2", "Everest"],
        correct: "Everest",
    },
    {
        id: "9",
        question: "Who is the best player of Nepal?",
        options: ["DS Airee", "Kushal Malla", "Kushal Bhurtel", "Gyanendra Malla"],
        correct: "Kushal Malla",
    },
];


restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});



nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        
        questionCount += 1;
        
        if (questionCount == quizArray.length) {
            
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
        
        i.options.sort(() => Math.random() - 0.5);
        
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    
    clearInterval(countdown);
   
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};