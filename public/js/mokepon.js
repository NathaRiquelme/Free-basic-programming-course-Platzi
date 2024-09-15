const attackSelectionSection = document.getElementById("select_your_attack");
const resetSection = document.getElementById("restart");
const playerPetSelectionButton = document.getElementById("button_select_pet");
const restartButton = document.getElementById("button_restart");
resetSection.style.display = "none";

const petSelectionSection = document.getElementById("select_your_pet");
const spanPlayersPet = document.getElementById("players_pet");
const spanEnemysPet = document.getElementById("enemys_pet");

const spanPlayersLives = document.getElementById("players_lives");
const spanEnemysLives = document.getElementById("enemys_lives");

const messagesSection = document.getElementById("result");
const playersAttacks = document.getElementById("players_attacks");
const enemysAttacks = document.getElementById("enemys_attacks");
const cardsContainer = document.getElementById("cards_container");
const attacksContainer = document.getElementById("attacks_container");

const seeTheMap = document.getElementById("see_the_map");
const map = document.getElementById("map");

let playerId = null;
let enemyId = null;
let mokepons = [];
let mokeponsEnemies = [];
let playerSelectsAttacks = [];
let enemysSelectsAttacks = [];
let listOfMokepons;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
let petChosenByThePlayer;
let petChosenByThePlayerObject;
let mokeponsAttacks;
let enemyAttacks;
let fireButton;
let waterButton;
let earthButton;
let buttons = [];
let indexOfplayerSelectsAttacks;
let indexOfenemysSelectsAttacks;
let playerWins = 0;
let enemyWins = 0;
let playersLives = 3;
let enemysLives = 3;
let canvas = map.getContext("2d");
let interval;
let mapBackground = new Image();
mapBackground.src = "./assets/mokemap.png";
let theHeightWeSeek;
let mapWidth = window.innerWidth - 20;
const maximumMapWidth = 350;
if (mapWidth > maximumMapWidth) {
  mapWidth = maximumMapWidth - 20;
}
theHeightWeSeek = (mapWidth * 800) / 600;
map.width = mapWidth;
map.height = theHeightWeSeek;
class Mokepon {
  constructor(name, photo, lives, type, avatarsOfOurMokepons) {
    this.name = name;
    this.photo = photo;
    this.lives = lives;
    this.type = type;
    this.attacks = [];
    this.weight = 40;
    this.height = 40;
    this.x = random(0, map.width - this.weight);
    this.y = random(0, map.height - this.height);
    this.photoInsideTheMap = new Image();
    this.photoInsideTheMap.src = avatarsOfOurMokepons;
    this.speedX = 0;
    this.speedY = 0;
  }

  paintMokepon() {
    canvas.drawImage(
      this.photoInsideTheMap,
      this.x,
      this.y,
      this.weight,
      this.height
    );
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "Water",
  "./assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "Earth",
  "./assets/capipepo.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "Fire",
  "./assets/ratigueya.png"
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "./assets/mokepons_mokepon_langostelvis_attack.png",
  5,
  "Water",
  "./assets/mokepons_mokepon_langostelvis_attack.png"
);

let tucapalma = new Mokepon(
  "Tucapalma",
  "./assets/mokepons_mokepon_tucapalma_attack.png",
  5,
  "Earth",
  "./assets/mokepons_mokepon_tucapalma_attack.png"
);

let pydos = new Mokepon(
  "Pydos",
  "./assets/mokepons_mokepon_pydos_attack.png",
  5,
  "Fire",
  "./assets/mokepons_mokepon_pydos_attack.png"
);

// let enemyLangostelvis = new Mokepon(
//   "Langostelvis",
//   "./assets/mokepons_mokepon_langostelvis_attack.png",
//   5,
//   "Water",
//   "./assets/mokepons_mokepon_langostelvis_attack.png",
//   140,
//   50
// );

// let enemyTucapalma = new Mokepon(
//   "Tucapalma",
//   "./assets/mokepons_mokepon_tucapalma_attack.png",
//   5,
//   "Earth",
//   "./assets/mokepons_mokepon_tucapalma_attack.png",
//   35,
//   100
// );

// let enemyPydos = new Mokepon(
//   "Pydos",
//   "./assets/mokepons_mokepon_pydos_attack.png",
//   5,
//   "Fire",
//   "./assets/mokepons_mokepon_pydos_attack.png",
//   160,
//   30
// );

const HIPODOGE_ATTACKS = [
  { name: "💦", id: "button_water_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "🔥", id: "button_fire_attack" },
];

hipodoge.attacks.push(...HIPODOGE_ATTACKS);

// enemyHipodoge.attacks.push(...HIPODOGE_ATTACKS);

const CAPIPEPO_ATTACKS = [
  { name: "🌎", id: "button_earth_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🔥", id: "button_fire_attack" },
];

capipepo.attacks.push(...CAPIPEPO_ATTACKS);

// enemyCapipepo.attacks.push(...CAPIPEPO_ATTACKS);

const RATIGUEYA_ATTACKS = [
  { name: "🔥", id: "button_fire_attack" },
  { name: "🔥", id: "button_fire_attack" },
  { name: "🔥", id: "button_fire_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🌎", id: "button_earth_attack" },
];

ratigueya.attacks.push(...RATIGUEYA_ATTACKS);

// enemyRatigueya.attacks.push(...RATIGUEYA_ATTACKS);

const LANGOSTELVIS_ATTACKS = [
  { name: "💦", id: "button_water_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "🔥", id: "button_fire_attack" },
];

langostelvis.attacks.push(...LANGOSTELVIS_ATTACKS);

const TUPACALMA_ATTACKS = [
  { name: "🌎", id: "button_earth_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "🌎", id: "button_earth_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🔥", id: "button_fire_attack" },
];

tucapalma.attacks.push(...TUPACALMA_ATTACKS);

const PYDOS_ATTACKS = [
  { name: "🔥", id: "button_fire_attack" },
  { name: "🔥", id: "button_fire_attack" },
  { name: "🔥", id: "button_fire_attack" },
  { name: "💦", id: "button_water_attack" },
  { name: "🌎", id: "button_earth_attack" },
];

pydos.attacks.push(...PYDOS_ATTACKS);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

function startTheGame() {
  attackSelectionSection.style.display = "none";
  seeTheMap.style.display = "none";
  mokepons.forEach((mokepon) => {
    listOfMokepons = `
    <input type="radio" name="pet" id="${mokepon.name}" />
        <label class="mokepon_card" for="${mokepon.name}">
          <p>${mokepon.name}</p>
          <img
            src="${mokepon.photo}"
            alt="${mokepon.name}"
        /></label>
    `;
    cardsContainer.innerHTML += listOfMokepons;

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
    inputLangostelvis = document.getElementById("Langostelvis");
    inputTucapalma = document.getElementById("Tucapalma");
    inputPydos = document.getElementById("Pydos");
  });

  playerPetSelectionButton.addEventListener("click", playerSelectsPet);
  restartButton.addEventListener("click", restartTheGame);
  joinTheGame();
}

function joinTheGame() {
  fetch("http:192.168.0.2:8080/jointhegame").then(function (res) {
    if (res.ok) {
      res.text().then(function (answer) {
        console.log(answer);
        playerId = answer;
      });
    }
  });
}

function playerSelectsPet() {
  seeTheMap.style.display = "flex";

  if (inputHipodoge.checked) {
    spanPlayersPet.innerHTML = inputHipodoge.id;
    petChosenByThePlayer = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanPlayersPet.innerHTML = inputCapipepo.id;
    petChosenByThePlayer = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanPlayersPet.innerHTML = inputRatigueya.id;
    petChosenByThePlayer = inputRatigueya.id;
  } else if (inputLangostelvis.checked) {
    spanPlayersPet.innerHTML = inputLangostelvis.id;
    petChosenByThePlayer = inputLangostelvis.id;
  } else if (inputTucapalma.checked) {
    spanPlayersPet.innerHTML = inputTucapalma.id;
    petChosenByThePlayer = inputTucapalma.id;
  } else if (inputPydos.checked) {
    spanPlayersPet.innerHTML = inputPydos.id;
    petChosenByThePlayer = inputPydos.id;
  } else {
    alert("You must select a pet");
    return;
  }
  petSelectionSection.style.display = "none";

  selectAMokepon(petChosenByThePlayer);
  extractAttacks(petChosenByThePlayer);
  startMap();
}

function selectAMokepon(petChosenByThePlayer) {
  fetch(`http:192.168.0.2:8080/mokepon/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: petChosenByThePlayer,
    }),
  });
}

function extractAttacks(petChosenByThePlayer) {
  let attacks;
  let type;
  for (let i = 0; i < mokepons.length; i++) {
    if (petChosenByThePlayer === mokepons[i].name) {
      attacks = mokepons[i].attacks;
      type = mokepons[i].type;
    }
  }
  showAttacks(attacks, type);
}

function showAttacks(attacks, type) {
  attacks.forEach((attack) => {
    mokeponsAttacks = `
           <button id=${attack.id} class="attack_button attackB">${attack.name}
        </button>
    `;
    attacksContainer.innerHTML += mokeponsAttacks;
  });

  if (type === "Fire") {
    mokeponsAttacks = `
           <button id=button_fire_attack class="attack_button attackB">🔥
        </button>
    `;
    attacksContainer.innerHTML = mokeponsAttacks + attacksContainer.innerHTML;
  }

  fireButton = document.getElementById("button_fire_attack");
  waterButton = document.getElementById("button_water_attack");
  earthButton = document.getElementById("button_earth_attack");
  buttons = document.querySelectorAll(".attackB");
}

function sequenceOfAttacks() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.innerText === "🔥") {
        playerSelectsAttacks.push("Fire");
        console.log(playerSelectsAttacks);
        button.style.background = "#023047";
        button.disabled = true;
      } else if (e.target.innerText === "💦") {
        playerSelectsAttacks.push("Water");
        console.log(playerSelectsAttacks);
        button.style.background = "#023047";
        button.disabled = true;
      } else {
        playerSelectsAttacks.push("Earth");
        console.log(playerSelectsAttacks);
        button.style.background = "#023047";
        button.disabled = true;
      }
      // enemysSelectsRandomAttacks();
      if (playerSelectsAttacks.length === 5) {
        sendAttacks();
      }
    });
  });
}

function sendAttacks() {
  fetch(`http:192.168.0.2:8080/mokepon/${playerId}/attacks`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attacks: playerSelectsAttacks,
    }),
  });

  interval = setInterval(obtainAttacks, 50);
}

function obtainAttacks() {
  fetch(`http:192.168.0.2:8080/mokepon/${enemyId}/attacks`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().then(function ({ attacks }) {
        if (attacks.length === 5) {
          enemysSelectsAttacks = attacks;
          combat();
        }
      });
    }
  });
}

function enemysSelectsPet(enemy) {
  // let randomEnemyPetSelection = random(0, mokepons.length - 1);
  spanEnemysPet.innerHTML = enemy.name;
  enemyAttacks = enemy.attacks;
  sequenceOfAttacks();
}

function enemysSelectsRandomAttacks() {
  let randomEnemyAttackSelection = random(0, enemyAttacks.length - 1);
  if (randomEnemyAttackSelection == 0 || randomEnemyAttackSelection == 1) {
    enemysSelectsAttacks.push("Fire");
  } else if (
    randomEnemyAttackSelection == 3 ||
    randomEnemyAttackSelection == 4
  ) {
    enemysSelectsAttacks.push("Water");
  } else {
    enemysSelectsAttacks.push("Earth");
  }
  console.log(enemysSelectsAttacks);
  startAFight();
}

function startAFight() {
  if (playerSelectsAttacks.length === 5) {
    combat();
  }
}

function indexOfBothOpponents(player, enemy) {
  indexOfplayerSelectsAttacks = playerSelectsAttacks[player];
  indexOfenemysSelectsAttacks = enemysSelectsAttacks[enemy];
}

function combat() {
  clearInterval(interval);
  for (let index = 0; index < playerSelectsAttacks.length; index++) {
    if (playerSelectsAttacks[index] === enemysSelectsAttacks[index]) {
      indexOfBothOpponents(index, index);
      createMessage("You tied");
    } else if (
      (playerSelectsAttacks[index] === "Fire" &&
        enemysSelectsAttacks[index] === "Earth") ||
      (playerSelectsAttacks[index] === "Water" &&
        enemysSelectsAttacks[index] === "Fire") ||
      (playerSelectsAttacks[index] === "Earth" &&
        enemysSelectsAttacks[index] === "Water")
    ) {
      indexOfBothOpponents(index, index);
      createMessage("You won");
      playerWins++;
      spanPlayersLives.innerHTML = playerWins;
    } else {
      indexOfBothOpponents(index, index);
      createMessage("You lost");
      enemyWins++;
      spanEnemysLives.innerHTML = enemyWins;
    }
  }
  checkWins();
}

function checkWins() {
  if (playerWins === enemyWins) {
    createFinalMessage("This was a tie");
  } else if (playerWins > enemyWins) {
    createFinalMessage("Congratulations you won!! 🏆");
  } else {
    createFinalMessage("You lost but try again");
  }
}

function createMessage(combatResult) {
  let newPlayersAttack = document.createElement("p");
  let newEnemysAttacks = document.createElement("p");
  messagesSection.innerHTML = combatResult;
  newPlayersAttack.innerHTML = indexOfplayerSelectsAttacks;
  newEnemysAttacks.innerHTML = indexOfenemysSelectsAttacks;
  playersAttacks.appendChild(newPlayersAttack);
  enemysAttacks.appendChild(newEnemysAttacks);
}

function createFinalMessage(finalResult) {
  messagesSection.innerHTML = finalResult;
  resetSection.style.display = "block";
}

function restartTheGame() {
  location.reload();
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function paintCanvas() {
  petChosenByThePlayerObject.x =
    petChosenByThePlayerObject.x + petChosenByThePlayerObject.speedX;
  petChosenByThePlayerObject.y =
    petChosenByThePlayerObject.y + petChosenByThePlayerObject.speedY;

  canvas.clearRect(0, 0, map.width, map.height);
  canvas.drawImage(mapBackground, 0, 0, map.width, map.height);
  petChosenByThePlayerObject.paintMokepon();
  sendPosition(petChosenByThePlayerObject.x, petChosenByThePlayerObject.y);
  mokeponsEnemies.forEach(function (mokepon) {
    mokepon.paintMokepon();
    checkCollision(mokepon);
  });

  // enemyHipodoge.paintMokepon();
  // enemyCapipepo.paintMokepon();
  // enemyRatigueya.paintMokepon();

  // if (
  //   petChosenByThePlayerObject.speedX !== 0 ||
  //   petChosenByThePlayerObject.speedY !== 0
  // ) {
  //   checkCollision(mokeponEnemy);
  //   checkCollision(mokeponEnemy);
  //   checkCollision(mokeponEnemy);
  // }
}

function sendPosition(x, y) {
  fetch(`http:192.168.0.2:8080/mokepon/${playerId}/position`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.JSON().then(function ({ enemies }) {
        console.log(enemies);
        mokeponsEnemies = enemies.map(function (enemy) {
          let mokeponEnemy = null;
          const mokeponName = enemy.mokepon.name || "";
          if (mokeponName === "Hipodoge") {
            let mokeponEnemy = new Mokepon(
              "Hipodoge",
              "./assets/mokepons_mokepon_hipodoge_attack.png",
              5,
              "Water",
              "./assets/hipodoge.png",
              enemy.id
            );
          } else if (mokeponName === "Capipepo") {
            let mokeponEnemy = new Mokepon(
              "Capipepo",
              "./assets/mokepons_mokepon_capipepo_attack.png",
              5,
              "Earth",
              "./assets/capipepo.png",
              enemy.id
            );
          } else if (mokeponName === "Ratigueya") {
            let mokeponEnemy = new Mokepon(
              "Ratigueya",
              "./assets/mokepons_mokepon_ratigueya_attack.png",
              5,
              "Fire",
              "./assets/ratigueya.png",
              enemy.id
            );
          }

          mokeponEnemy.x = enemy.x;
          mokeponEnemy.y = enemy.y;

          return mokeponEnemy;
        });
      });
    }
  });
}

function moveRight() {
  petChosenByThePlayerObject.speedX = 5;
}

function moveLeft() {
  petChosenByThePlayerObject.speedX = -5;
}

function moveDown() {
  petChosenByThePlayerObject.speedY = 5;
}

function moveUp() {
  petChosenByThePlayerObject.speedY = -5;
}

function stopMoving() {
  petChosenByThePlayerObject.speedX = 0;
  petChosenByThePlayerObject.speedY = 0;
}

function aKeyWasPressed(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      break;
  }
}

function startMap() {
  petChosenByThePlayerObject = getTheSelectedMokepon(petChosenByThePlayer);
  console.log(petChosenByThePlayerObject, petChosenByThePlayer);

  interval = setInterval(paintCanvas, 50);
  window.addEventListener("keydown", aKeyWasPressed);
  window.addEventListener("keyup", stopMoving);
}

function getTheSelectedMokepon() {
  for (let i = 0; i < mokepons.length; i++) {
    if (petChosenByThePlayer === mokepons[i].name) {
      return mokepons[i];
    }
  }
}

function checkCollision(enemy) {
  const topPartOfTheEnemy = enemy.y;
  const bottomOfTheEnemy = enemy.y + enemy.height;
  const rightSideOfTheEnemy = enemy.x + enemy.width;
  const leftSideOfTheEnemy = enemy.x;

  const topPartOfThePet = petChosenByThePlayerObject.y;
  const bottomOfThePet =
    petChosenByThePlayerObject.y + petChosenByThePlayerObject.height;
  const rightSideOfThePet =
    petChosenByThePlayerObject.x + petChosenByThePlayerObject.width;
  const leftSideOfThePet = petChosenByThePlayerObject.x;
  if (
    bottomOfThePet < topPartOfTheEnemy ||
    topPartOfThePet > bottomOfTheEnemy ||
    rightSideOfThePet < leftSideOfTheEnemy ||
    leftSideOfThePet > rightSideOfTheEnemy
  ) {
    return;
  }
  stopMoving();
  clearInterval(interval);
  enemyId = enemy.id;
  attackSelectionSection.style.display = "flex";
  seeTheMap.style.display = "none";
  enemysSelectsPet(enemy);
}

window.addEventListener("load", startTheGame);
