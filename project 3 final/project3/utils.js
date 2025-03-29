//#region Show/Hide Windows
// Hide an element
function hideElement(el) {
    el.style.display = "none";
}
// Show an element with a specific style
function showElement(el, displayStyle = "block") {
    el.style.display = displayStyle;
}

// Hide all game windows
function hideAllGameWindows() {
    for (let w of gameWindows) {
        hideElement(w);
    }
}

// Show a specific game window after hiding all.
function showGameWindow(w, displayStyle = "block") {
    hideAllGameWindows();
    showElement(w, displayStyle);
}


//#endregion

// Attempt to remove materials from an inventory, then run unlockFunction on target and reveal the next button.
function attemptUnlock(names, amounts, unlockFunction, target, button, nextButton) {

    let anyNull = false;
    // Check if any materials are null
    for (let material of names) {
        if (playerMaterials.getMaterialFromName(material) == null) {
            anyNull = true;
        }
    }
    
    let validAmounts = true;
    // Check for valid amounts
    if (anyNull == false) {
        for (let i in names) {
            if (playerMaterials.getMaterialFromName(names[i]).amount <= amounts[i]){
                validAmounts = false
            }
        }
    }

    // If both not null & have enough, subtract & execute
    if (validAmounts == true && anyNull == false) {
        for (let i in names) {
            playerMaterials.addMaterial(materialDictionary.retrieveValidMaterial((names[i]), (amounts[i] * -1)));
        }
        hideElement(button);
        
        if (nextButton != null) {
            showElement(nextButton);
        }

        unlockFunction(target);
    }
}

// Toggle super speed
function toggleCheatskidoodles(activities, value) {
    for (let a of activities) {
        if (a.speed == 1) {
            a.speed = value;
        }

        else {
            a.speed = 1;
        }
    }
}

// Update the bars every frame based on the elapsed time between frames.
function update(newTimestamp) {
    deltaTime = newTimestamp - timestamp;

    timestamp = newTimestamp;

    for (let bar of progressBars) {
        bar.updateBar(deltaTime);
    }
    requestAnimationFrame(update);
}

// Set the twinkle sound.
twinkle = new Howl({
    src: ["audio/twinkle.mp3"],
  });
