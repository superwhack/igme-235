// Windows & Other major HTML
let mainWindow = document.querySelector("#window");

let modeMenuWindow = document.querySelector("#mode_menu_window");

let collectionModeButton = document.querySelector("#collection_mode_button");
let materialsModeButton = document.querySelector("#materials_mode_button");
let adventureModeButton = document.querySelector("#adventure_mode_button");
let tutorialButton = document.querySelector("#tutorial_button");
let mainGameWindow = document.querySelector("#main_game_window");

let gameHeader = document.querySelector("#game_header");
let gameHeaderText = document.querySelector("#game_header_text");
let tutorialWindow = document.querySelector("#tutorial_window");
let collectionWindow = document.querySelector("#collection_window");
let materialsWindow = document.querySelector("#materials_window");
let adventureWindow = document.querySelector("#adventure_window");

let unlockButton1 = document.querySelector("#unlock_1");
let unlockButton2 = document.querySelector("#unlock_2");
let unlockButton3 = document.querySelector("#unlock_3")

let cheatButton = document.querySelector("#cheat_button");
let superCheatButton = document.querySelector("#supercheat_button");
let itemButton = document.querySelector("#item_cheat_button");

// Collections / Arrays
let gameWindows = document.querySelectorAll(".game_window");
let modeButtons = document.querySelectorAll(".mode_button");
let progressBars = [];
let activities = [];


// Game Variables
let visualCollection = new VisualInventory(collectionWindow);
let visualMaterials = new VisualInventory(materialsWindow);

playerCollection = new PlayerCollection([], visualCollection);
playerMaterials = new PlayerMaterials([], visualMaterials);

// Dictionaries
let squeebDictionary = new SqueebDictionary();
let materialDictionary = new MaterialDictionary();

// Assigning Buttons 
collectionModeButton.onclick = (e) => { playerCollection.populateCollectionInventory(); showGameWindow(collectionWindow, "flex"); gameHeaderText.innerHTML = "collection"; };
materialsModeButton.onclick = (e) => { playerMaterials.populateMaterialInventory(); showGameWindow(materialsWindow, "flex"); gameHeaderText.innerHTML = "materials" };
adventureModeButton.onclick = (e) => { showGameWindow(adventureWindow); gameHeaderText.innerHTML = "adventure" };

tutorialButton.onclick = (e) => {showGameWindow(tutorialWindow); gameHeaderText.innerHTML = "javasqueebs!" };

unlockButton1.onclick = (e) => {
    attemptUnlock(["stiqs", "stoans", "bohns"], [50, 50, 30], showElement, squainsAdventure.div, unlockButton1, unlockButton2);
}

unlockButton2.onclick = (e) => {
    attemptUnlock(["chow", "grub", "nosh"], [70, 70, 50], showElement, squndraAdventure.div, unlockButton2, unlockButton3);
}

unlockButton3.onclick= (e) => {
    attemptUnlock(["stiqs", "stoans", "bohns", "chow", "grub", "nosh", "snoe", "ites", "flaqes"], [200, 200, 200, 200, 200, 200, 200, 200, 200], function() {playerCollection.addSqueeb(squeebDictionary.retrieveValidSqueeb("royal"))}, null, unlockButton3, null);
}

cheatButton.onclick = (e) => {
    toggleCheatskidoodles(activities, 3);
}

superCheatButton.onclick = (e) => {
    toggleCheatskidoodles(activities, 10);
}

itemButton.onclick = (e) => {
    let materialList = ["stiqs", "stoans", "bohns", "chow", "grub", "nosh", "snoe", "ites", "flaqes"];
    for (let name of materialList) {
        playerMaterials.addMaterial(materialDictionary.retrieveValidMaterial(name, 999));
    }
}

// First timestamp
let timestamp = document.timeline.currentTime;
let deltaTime = 0;


// Add the first squeeb
playerCollection.addSqueeb(squeebDictionary.retrieveValidSqueeb("prime"));

// Squorest
let squorestLoot = new LootTable([5, 5, 3, 3, 3, 1, 1, 1, 1, 0.5, 0.5, 0.1] ,
    [materialDictionary.retrieveValidMaterial("stiqs", 2),
    materialDictionary.retrieveValidMaterial("stoans", 2),
    materialDictionary.retrieveValidMaterial("stiqs", 3),
    materialDictionary.retrieveValidMaterial("stoans", 3),
    materialDictionary.retrieveValidMaterial("bohns", 2),
    squeebDictionary.retrieveValidSqueeb("goofy"),
    squeebDictionary.retrieveValidSqueeb("squeeze"),
    squeebDictionary.retrieveValidSqueeb("squat"),
    squeebDictionary.retrieveValidSqueeb("hug"),
    squeebDictionary.retrieveValidSqueeb("sprite"),
    squeebDictionary.retrieveValidSqueeb("reflex"),
    squeebDictionary.retrieveValidSqueeb("velvet")
]);

let squorestBar = new ProgressBar(document.querySelector("#a_progressbar_in_1"), document.querySelector("#a_progressbar_outer_1"), 1);

progressBars.push(squorestBar);

let squorestSelector = new SqueebSelector(document.querySelector("#a_squeeb_selector_1"), document.querySelector("#a_squeeb_image_1"), document.querySelector("#a_squeeb_title_1"), playerCollection);

let squorestAdventure = new Adventure(
    2000.0, 
    document.querySelector("#adventure_1"),
    squorestBar, 
    squorestSelector, 
    document.querySelector("#a_toggle_button_1"), 
    document.querySelector("#a_results_1"), 
    squorestLoot, 
    playerCollection, 
    playerMaterials);

activities.push(squorestAdventure);


// Squains
let squainsLoot = new LootTable([5, 5, 3, 3, 3, 1, 1, 1, 1, 0.5, 0.5, 0.1],
    [materialDictionary.retrieveValidMaterial("chow", 2),
    materialDictionary.retrieveValidMaterial("grub", 2),
    materialDictionary.retrieveValidMaterial("chow", 3),
    materialDictionary.retrieveValidMaterial("grub", 3),
    materialDictionary.retrieveValidMaterial("nosh", 2),
    squeebDictionary.retrieveValidSqueeb("gooey"),
    squeebDictionary.retrieveValidSqueeb("staple"),
    squeebDictionary.retrieveValidSqueeb("jaw"),
    squeebDictionary.retrieveValidSqueeb("pop"),
    squeebDictionary.retrieveValidSqueeb("friends"),
    squeebDictionary.retrieveValidSqueeb("length"),
    squeebDictionary.retrieveValidSqueeb("beebus")
]);

let squainsBar = new ProgressBar(document.querySelector("#a_progressbar_in_2"), document.querySelector("#a_progressbar_outer_2"), 1);

progressBars.push(squainsBar);

let squainsSelector = new SqueebSelector(document.querySelector("#a_squeeb_selector_2"), document.querySelector("#a_squeeb_image_2"), document.querySelector("#a_squeeb_title_2"), playerCollection);

let squainsAdventure = new Adventure(
    5000.0, 
    document.querySelector("#adventure_2"),
    squainsBar, 
    squainsSelector, 
    document.querySelector("#a_toggle_button_2"), 
    document.querySelector("#a_results_2"), 
    squainsLoot, 
    playerCollection, 
    playerMaterials);

activities.push(squainsAdventure);
hideElement(squainsAdventure.div);

// Squndra
let squndraLoot = new LootTable([5, 5, 3, 3, 3, 1, 1, 1, 1, 0.5, 0.5, 0.1, 0.1],
    [materialDictionary.retrieveValidMaterial("snoe", 2),
    materialDictionary.retrieveValidMaterial("ites", 2),
    materialDictionary.retrieveValidMaterial("snow", 3),
    materialDictionary.retrieveValidMaterial("ites", 3),
    materialDictionary.retrieveValidMaterial("flaqes", 2),
    squeebDictionary.retrieveValidSqueeb("fluff"),
    squeebDictionary.retrieveValidSqueeb("scruff"),
    squeebDictionary.retrieveValidSqueeb("boots"),
    squeebDictionary.retrieveValidSqueeb("hook"),
    squeebDictionary.retrieveValidSqueeb("see"),
    squeebDictionary.retrieveValidSqueeb("energily"),
    squeebDictionary.retrieveValidSqueeb("choir"),
    squeebDictionary.retrieveValidSqueeb("loopsy")
]);

let squndraBar = new ProgressBar(document.querySelector("#a_progressbar_in_3"), document.querySelector("#a_progressbar_outer_3"), 1);

progressBars.push(squndraBar);

let squndraSelector = new SqueebSelector(document.querySelector("#a_squeeb_selector_3"), document.querySelector("#a_squeeb_image_3"), document.querySelector("#a_squeeb_title_3"), playerCollection);

let squndraAdventure = new Adventure(
    9000.0, 
    document.querySelector("#adventure_3"),
    squndraBar, 
    squndraSelector, 
    document.querySelector("#a_toggle_button_3"), 
    document.querySelector("#a_results_3"), 
    squndraLoot, 
    playerCollection, 
    playerMaterials);

activities.push(squndraAdventure);
hideElement(squndraAdventure.div);

hideElement(unlockButton2);
hideElement(unlockButton3);

showGameWindow(tutorialWindow);


// Begin the update loop !
requestAnimationFrame(update);
