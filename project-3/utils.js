//#region Show/Hide Windows
function hideElement(el) {
    el.style.display = "none";
}

function showElement(el, displayStyle = "block") {
    el.style.display = displayStyle;
}

function hideAllGameWindows() {
    for (let w of gameWindows) {
        hideElement(w);
    }
}

function showGameWindow(w, displayStyle = "block") {
    hideAllGameWindows();
    showElement(w, displayStyle);
}


//#endregion

function attemptUnlock(names, amounts, unlockFunction, target, button, nextButton) {
    console.log("unlock attempt");

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
            playerMaterials.addMaterial(materialDictionary.retrieveValidMaterial(names[i]), amounts[i] * -1);
        }
        hideElement(button);
        
        if (nextButton != null) {
            showElement(nextButton);
        }

        unlockFunction(target);
    }

    else {
        console.log("fail")
    }
}

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
function update(newTimestamp) {
    deltaTime = newTimestamp - timestamp;

    timestamp = newTimestamp;

    for (let bar of progressBars) {
        bar.updateBar(deltaTime);
    }
    requestAnimationFrame(update);
}
