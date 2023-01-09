class Hero {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    this.canFly = false;
    this.shield = false;
    this.laser = false;
    this.boomerang = false;
    this.superspeed = false;
    this.teleportation = false;
  }

  attacked(damage) {
    //daca eroul are proprietatea canFly, sunt 50% sanse sa evite damage-ul
    if (this.canFly) {
      let chance = Math.random();
      if (chance > 0.5) {
        console.log(this.name + " flew away");
        damage = 0;
      }
    }
    // daca eroul are proprietatea shield, damage-ul este redus cu 20%
    if (this.shield) {
      damage *= 0.8;
      // damage-ul scade cu 0.2
      console.log(this.name + " defends with a shield");
    }

    if (this.superspeed) {
      let chance = Math.random();
      if (chance > 0.5) {
        console.log(this.name + " used his SuperSpeed and dodged the attack");
        damage = 0;
      }
    }

    this.hp -= damage;
    console.log(
      this.name +
        " has been attacked. HP reduced by " +
        damage +
        ". HP remaining : " +
        this.hp +
        "."
    );
  }
}

class Superhuman extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.canFly = true;
    this.laser = true;
  }

  attack(otherHero) {
    let damage = 15;
    let chance = Math.random();
    if (this.laser === true && chance > 0.3) {
      damage *= 2;
      console.log(
        this.name +
          " used laser eyes and did " +
          damage +
          "! " +
          "double damage."
      );
    } else {
      console.log(this.name + " attacked with damage: " + damage + ".");
    }
    otherHero.attacked(damage);
  }
}

class Batman extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.boomerang = true;
    this.shield = true;
  }

  attack(otherHero) {
    let damage = 15;
    let chance = Math.random();
    if (this.boomerang === true && chance > 0.3) {
      damage *= 1.5;
      console.log(
        this.name + " used his boomerang and did " + damage + " damage."
      );
    } else {
      console.log(this.name + " attacked with damage: " + damage + ".");
    }
    otherHero.attacked(damage);
  }
}

class Flash extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.superspeed = true;
  }

  attack(otherHero) {
    let damage = 10;
    let chance = Math.random();
    if (this.superspeed === true && chance > 0.3) {
      damage *= 2;
      console.log(
        this.name +
          " used his SuperSpeed and threw The Infinte Mass Punch and did " +
          damage +
          "! double damage."
      );
    }
    otherHero.attacked(damage);
  }
}

class Fight {
  constructor(hero1, hero2) {
    this.addHero1(hero1);
    this.addHero2(hero2);
    this.turn = 0; // pt a stii al cui turn este si pot avea valori de 0 sau 1
  }

  performAttack() {
    if (this.turn === 0) {
      this.hero1.attack(this.hero2);
    } else {
      this.hero2.attack(this.hero1);
    }
  }

  addHero1(hero) {
    this.hero1 = hero;
  }

  addHero2(hero) {
    this.hero2 = hero;
  }

  changeTurn() {
    this.turn = 1 - this.turn; // se schimba tura din 1 in 0 si invers
  }

  findWinner() {
    if (this.hero1.hp > 0) {
      console.log(this.hero1.name + " won with " + this.hero1.hp + " HP left.");
      msgBox.innerHTML =
        this.hero1.name + " won with " + this.hero1.hp + " HP left.";
      msgBox.classList.remove("hide");
      return msgBox;
    } else if (this.hero2.hp > 0) {
      console.log(this.hero2.name + " won with " + this.hero2.hp + " HP left.");
      msgBox.innerHTML =
        this.hero2.name + " won with " + this.hero2.hp + " HP left.";
      msgBox.classList.remove("hide");
      return msgBox;
    } else {
      console.log("No heroes left alive.");
      msgBox.innerHTML = "It was an epic fight, but both Heroes died.";
      msgBox.classList.remove("hide");
      return msgBox;
    }
  }

  go() {
    do {
      this.performAttack();
      this.changeTurn();
    } while (this.hero1.hp > 0 && this.hero2.hp > 0);

    this.findWinner();
  }
}
let player1;
let player2;
let superman = new Superhuman("Superman", 110);
let batman = new Batman("Batman", 100);
let flash = new Flash("The Flash", 100);
let msgBox = document.querySelector(".box");
let epicFight = new Fight(player1, player2);

document.querySelector(".the-flash-select").addEventListener("click", () => {
  console.log(flash);
  if (player1 === undefined) {
    player1 = flash;
    epicFight.addHero1(player1);
    document.querySelector(".the-flash-select").classList.add("disabled");
  } else if (player2 === undefined && player1 !== flash) {
    player2 = flash;
    epicFight.addHero2(player2);
    document.querySelector(".the-flash-select").classList.add("disabled");
  } else if (player1 === flash) {
    player1 = undefined;
    document.querySelector(".the-flash-select").classList.remove("disabled");
  } else if (player2 === flash) {
    player2 = undefined;
    document.querySelector(".the-flash-select").classList.remove("disabled");
  }
  console.log(player1, player2);
});

document.querySelector(".batman-select").addEventListener("click", () => {
  console.log(batman);
  if (player1 === undefined) {
    player1 = batman;
    epicFight.addHero1(player1);
    document.querySelector(".batman-select").classList.add("disabled");
  } else if (player2 === undefined && player1 !== batman) {
    player2 = batman;
    epicFight.addHero2(player2);
    document.querySelector(".batman-select").classList.add("disabled");
  } else if (player1 === batman) {
    player1 = undefined;
    document.querySelector(".batman-select").classList.remove("disabled");
  } else if (player2 === batman) {
    player2 = undefined;
    document.querySelector(".batman-select").classList.remove("disabled");
  }
});

document.querySelector(".superman-select").addEventListener("click", () => {
  console.log(superman);
  if (player1 === undefined) {
    player1 = superman;
    epicFight.addHero1(player1);
    document.querySelector(".superman-select").classList.add("disabled");
  } else if (player2 === undefined && player1 !== superman) {
    player2 = superman;
    epicFight.addHero2(player2);
    document.querySelector(".superman-select").classList.add("disabled");
  } else if (player1 === superman) {
    player1 = undefined;
    document.querySelector(".superman-select").classList.remove("disabled");
  } else if (player2 === superman) {
    player2 = undefined;
    document.querySelector(".superman-select").classList.remove("disabled");
  }
});

let startFight = document.querySelector(".go-btn");
startFight.addEventListener("click", function () {
  epicFight.go();
});
