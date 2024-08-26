/*****************************************************************************
 * Challenge 2: Review the provided code.
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 */

const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    console.log("Adding games to the page:", games); // Debugging statement
    for (let i = 0; i < games.length; i++) {
        const gamediv = document.createElement("div");
        gamediv.classList.add("game-card");
        gamediv.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name} cover image" class="game-image" width="200" height="200"/>
            <h2>${games[i].name}</h2>
            <p>${games[i].description}</p>
        `;
        gamesContainer.appendChild(gamediv);
    }
}

addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
contributionsCard.innerHTML = `Total Contributions: ${totalContributions.toLocaleString()}`; // Secret Key Component 1
console.log("Total Contributions:", totalContributions); // Debugging statement

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `Total Raised: $${totalRaised.toLocaleString()}`; // Secret Key Component 2
console.log("Total Raised:", totalRaised); // Debugging statement

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numberOfGames = GAMES_JSON.length;
gamesCard.innerHTML = `Number of Games: ${numberOfGames}`; // Secret Key Component 3
console.log("Number of Games:", numberOfGames); // Debugging statement

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Unfunded Games:", unfundedGames); // Debugging statement
    console.log("Number of Unfunded Games:", unfundedGames.length); // Debugging statement
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Funded Games:", fundedGames); // Debugging statement
    console.log("Number of Funded Games:", fundedGames.length); // Debugging statement
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company
 */

const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = numberOfUnfundedGames === 0
    ? `A total of $${totalRaised.toLocaleString()} has been raised across ${numberOfGames} games. All games are fully funded!`
    : `A total of $${totalRaised.toLocaleString()} has been raised across ${numberOfGames} games. ${numberOfUnfundedGames} game${numberOfUnfundedGames > 1 ? 's are' : ' is'} still unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionElement);
console.log("Description Text:", descriptionText); // Debugging statement

/*****************************************************************************
 * Challenge 7: Select & display the top 2 games
 */

// grab the containers for the top two games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// sort games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// destructure to get the top two games and the rest
const [topGame, secondTopGame, ...rest] = sortedGames;

// Secret key component 1: First word of the most funded game
const topGameFirstWord = topGame.name.split(' ')[0];  // log this for your secret key

// Secret key component 2: First word of the second most funded game
const secondTopGameFirstWord = secondTopGame.name.split(' ')[0];  // log this for your secret key

// Secret key component 3: Value of ...rest is [3, 4, 5, 6] in another example, and here it's the remaining games after the top two

// Display the top funded game
const topGameElement = document.createElement("p");
topGameElement.innerText = `${topGame.name} - Pledged: $${topGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(topGameElement);

// Display the second most funded game
const secondGameElement = document.createElement("p");
secondGameElement.innerText = `${secondTopGame.name} - Pledged: $${secondTopGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameElement);

// Log the first words of the top two games for secret key purposes
console.log("Top Game First Word:", topGameFirstWord);
console.log("Second Top Game First Word:", secondTopGameFirstWord);

