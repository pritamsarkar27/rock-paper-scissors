const addBoxButton = document.getElementById("togglerulebook");
const hiddenBox = document.querySelector(".rulebook.hidden");
const crossbtn = document.getElementById("cross");

const addBoxButton1 = document.getElementById("addBox");
const hiddenBox1 = document.querySelector(".sub-box.hidden");

const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".hand");
const result = document.getElementById("yourchoice");
const mainElement = document.querySelector(".main");

let savedCompsScore = localStorage.getItem("compsScore");
let savedUsersScore = localStorage.getItem("usersScore");

let comps = document.getElementById("scorecomp");
let users = document.getElementById("scoreuser");

comps.textContent = savedCompsScore !== null ? savedCompsScore : 0;
users.textContent = savedUsersScore !== null ? savedUsersScore : 0;

const gameSet = document.querySelector(".gameSet");
const hideaddbox = document.querySelector(".addBox");
const declrresult = document.getElementById("status");
const hidemainresbox = document.querySelector(".mainresbox");

addBoxButton.addEventListener("click", () => {
  if (hiddenBox.classList.contains("hidden")) {
    hiddenBox.classList.remove("hidden");
  } else {
    hiddenBox.classList.add("hidden");
  }
  crossbtn.addEventListener("click", function () {
    hiddenBox.classList.add("hidden");
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", playGame);
  button.addEventListener("click", function () {
    const backgroundValue =
      getComputedStyle(button).getPropertyValue("background-image");
    const borderColor =
      getComputedStyle(button).getPropertyValue("border-color");
    mainElement.style.backgroundImage = backgroundValue;
    mainElement.style.borderColor = borderColor;
    gameSet.style.display = "none";
    hideaddbox.style.display = "flex";
    hidemainresbox.style.display = "block";
  });
});

function playGame(event) {
  const playerChoice = event.target.id;
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const winner = getWinner(playerChoice, computerChoice);
  const partTwo = document.querySelector(".parttwo");
  const partOne = document.querySelector(".partone");

  declrresult.textContent = `${winner} `;

  const mainTwoElement = document.querySelector(".main.two");

  if (computerChoice === "rock") {
    mainTwoElement.style.backgroundImage = "var(--rock)";
    mainTwoElement.style.borderColor = "var(--rockcolor)";
  } else if (computerChoice === "paper") {
    mainTwoElement.style.backgroundImage = "var(--paper)";
    mainTwoElement.style.borderColor = "var(--papercolor)";
  } else if (computerChoice === "scissors") {
    mainTwoElement.style.backgroundImage = "var(--scissors)";
    mainTwoElement.style.borderColor = "var(--scissorcolor)";
  }

  addBoxButton1.addEventListener("click", () => {
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      partOne.classList.remove("animate");
      partTwo.classList.remove("animate");
    }
    gameSet.style.display = "block";
    hidemainresbox.style.display = "none";
    if (
      parseInt(users.textContent) === 5 ||
      parseInt(comps.textContent) === 5
    ) {
      hiddenBox1.classList.remove("hidden");
      users.textContent = 0;
      comps.textContent = 0;
      hiddenBox1.classList.add("hidden");
    }
  });
  if (winner === "YOU WIN") {
    users.textContent = parseInt(users.textContent) + 1;

    localStorage.setItem("usersScore", users.textContent);
    console.log(`${parseInt(users.textContent)}`);
    if (parseInt(users.textContent) === 5) {
      hiddenBox1.classList.remove("hidden");
    }
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      partOne.classList.toggle("animate");
    }
  } else if (winner === "YOU LOST") {
    comps.textContent = parseInt(comps.textContent) + 1;
    localStorage.setItem("compsScore", comps.textContent);
    toggleAnimation();
    function toggleAnimation() {
      console.log("toggled");
      partTwo.classList.toggle("animate");
    }
  } else {
    partOne.classList.toggle("animate");
    partTwo.classList.toggle("animate");
  }
}

const getWinner = (player, computer) => {
  if (player === computer) {
    return "TIE UP";
  } else if (
    (player === "rock" && computer === "paper") ||
    (player === "paper" && computer === "scissors") ||
    (player === "scissors" && computer === "rock")
  ) {
    return "YOU LOST";
  } else {
    return "YOU WIN";
  }
};


