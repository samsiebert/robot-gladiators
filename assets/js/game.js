// random number genertor function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};


// shop function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your helath, UPGRADE your attack, or LEAVE the store? Please enter one "REFILL", "UPGRADE", or "LEAVE" to make a choice."
    );

    // use switch case to carry out action
    switch (shopOptionPrompt) {
        case "REFILL" :
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfor.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
        // do nothing, so function will end
        break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
        }
    };

// player info onject
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {
        this.helath += 20;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough momney!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
    }
 }

console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

// enemy info object
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {

    while (playerInfo.health > 0 && enemy.health > 0) {
    //prompt player if they'd like to fight
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
if (promptFight === "skip" || promptFight === "SKIP") {
    //cofirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

     //is yes (true), leave fight
     if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        //subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money)
        break;
    }
}
    //remove enemy's health by subtracting playerInfo.attack
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

     enemy.health = Math.max(0, enemy.health - damage);
     console.log(
         playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
     );

    //check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
    
        //award player money for winning
        playerInfo.money = playerInfo.money + 20;

        //leave hwile() loop since enemy is dead
        break;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

    //remove player's health by subtracting enemy.attack
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
        enemy.name + " attacked " + playerInfo.name +". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    //check player's health
    if (playerInfo.health <= 0) {
         window.alert(playerInfo.name + " has died!");
         // leave while() loop if player is dead    
     } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        } 
    } //end of while loop
}//end of fight functions 

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;

for(var i = 0; i < enemyInfo.length; i++) {
    //if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        // let player know what round they are in, remember arrats start at 0 so it need to have 1 added to it
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

        //pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemy.health befores starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        //use debugger to pause script from running and check whats going on at the moment ion thecode 
        //debugger;

        //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            shop();
        };
    }
    //if player isn't alive, stop the game
    else {
        window.alert("You have lost your robot in battle! Game Over!");
        }

    //function to end the entire game
    var endGame = function() {
        // if player still alive, player wins!
        if (playerInfo.health > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
         }
         else {
            window.alert("The game has now ended. Let's see how you did!");
        }

        // ask player if they'd like to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
         // restart the game
        startGame();
        }
         else {
         window.alert("Thank you for playing Robot Gladiators! Come back soon!");
         }
        }
    };
        // after the loop ends, player is either out of health or enemies to fight, run endGame function
        endGame();
    };


// start the game when the page loads
startGame();