// A class representing a squeeb
class Squeeb {
    constructor(name, modifier) {
        this.name = name;
        this.modifier = modifier;
        this.active = false;
    }
}

// A class representing a material and its amount
class Material {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

// A class representing the player's squeeb collection
class PlayerCollection {
    constructor(list, visualInventory) {
        this.list = list;
        this.visualInventory = visualInventory;
    }

    // Add a squeeb to the collection if it isn't already in.
    addSqueeb(s) {
        let currentNames = [];
        for (let sq of this.list) {
            currentNames.push(sq.name);
        }

        if (!currentNames.includes(s.name)) {
            this.list.push(s);
            this.visualInventory.populateVisualInventory(this.list);
            twinkle.play();
        }
        else {
            return false;
        }
    }

    // Populate the visual inventory with the squeebs.
    populateCollectionInventory() {
        this.visualInventory.populateVisualInventory(this.list)
    }
}

// A class representing the player's materials
class PlayerMaterials {
    constructor(list, visualInventory) {
        this.list = list;
        this.visualInventory = visualInventory;
    }

    // Add a material to the player's materials. If it's already in the list, inrcease the amount.
    addMaterial(newMaterial) {
        let currentNames = [];

        for (let ma of this.list) {
            currentNames.push(ma.name);
        }

        if (!currentNames.includes(newMaterial.name)) {
            this.list.push(new Material(newMaterial.name, newMaterial.amount));
            this.visualInventory.populateVisualInventory(this.list);
        }

        else {
            for (let ma of this.list) {
                if (ma.name == newMaterial.name) {
                    ma.amount += newMaterial.amount;
                    this.visualInventory.updateValue(ma);
                }
                
            }

        }
    }

    // Populate the inventory of materials
    populateMaterialInventory() {
        this.visualInventory.populateVisualInventory(this.list)
    }

    // Get a material by its name
    getMaterialFromName(name) {
        for (let material of this.list) {
            if (material.name == name) {
                return material;
            }
        }
        return null;
    }
}


// A class representing a generic visual inventory.
class VisualInventory {
    constructor(div) {
        this.div = div;
        this.boxList = [];
    }

    // Populate the items in the visual inventory from a list.
    populateVisualInventory(list) {
        this.clearVisualInventory();
        
        for (let s of list) {
            this.createVisualInventoryBox(s);
        }
    }

    // Clear the visual inventory.
    clearVisualInventory() {
        this.div.innerHTML = "";
    }

    // Create a visual inventory box and add it to the list.
    createVisualInventoryBox(obj) {
        let inventoryBox = new InventoryBox(obj);

        this.div.appendChild(inventoryBox.box);
        this.boxList.push(inventoryBox);
    }

    // Update the value of a specific inventory box.
    updateValue(obj) {
        let index = null;

        for (let i in this.boxList) {
            if (this.boxList[i].itemTitle.innerHTML == obj.name) {
                index = i;
            }
        }

        if (index != null) {
            if (obj instanceof Squeeb) {
                this.boxList[index].itemTitle.innerHTML = obj.modifier;
            }

            if (obj instanceof Material) {
                this.boxList[index].itemSubtitle.innerHTML = obj.amount;
            }
        }
    }
}

// A class representing the valid squeebs.
class SqueebDictionary {
    constructor() {
        this.validSqueebs = [
            ["beebus", 2.9],
            ["boots", 3.4],
            ["choir", 3.9],
            ["energily", 3.7],
            ["fluff", 3.2],
            ["friends", 2.7],
            ["gooey", 2.2],
            ["goofy", 1.2],
            ["hook", 3.5],
            ["hug", 1.5],
            ["jaw", 2.4],
            ["length", 2.6],
            ["loopsy", 4.0],
            ["pop", 2.5],
            ["prime", 1.0],
            ["reflex", 1.6],
            ["scruff", 3.3],
            ["see", 3.6],
            ["sprite", 1.7],
            ["squat", 1.4],
            ["squeeze", 1.3],
            ["staple", 2.3],
            ["velvet", 1.9],
            ["royal", 6.0]
        ]
    }

    // Attempt to retrieve a valid squeeb.
    retrieveValidSqueeb(name) {
        for (let squeeb of this.validSqueebs) {
            if (squeeb[0] == name) {
                return new Squeeb(squeeb[0], squeeb[1]);
            }
        }
        
        return null;
    }

}

// A class representing the valid materials
class MaterialDictionary {
    constructor() {
        this.validMaterials = ["stiqs", 
            "stoans", 
            "bohns", 
            "grub", 
            "chow", 
            "nosh", 
            "grats", 
            "snoe", 
            "ites", 
            "flaqes"]
       }

    // Attempt to retrieve a valid material with a given amount.
    retrieveValidMaterial(name, amount) {
        if (this.validMaterials.includes(name)) {
            return new Material(name, amount);
        }

        else {
            return null;
        }
    }
}

// A class representing an inventory box in a visual inventory.
class InventoryBox {
    constructor(obj) {
        this.box = document.createElement("div");
        this.itemImage = document.createElement("img");
        this.itemTitle = document.createElement("p");
        this.itemSubtitle = document.createElement("p");
    
        this.box.appendChild(this.itemImage);
        this.box.appendChild(this.itemTitle);
        this.box.appendChild(this.itemSubtitle);
    
        this.box.classList.add("inventory_box");
        this.itemImage.classList.add("inventory_image");
        this.itemTitle.classList.add("inventory_title");
        this.itemSubtitle.classList.add("inventory_subtitle");
    
        this.itemImage.alt = obj.name;
        
        if (obj instanceof Material) {
            this.itemImage.src = `images/materials/${obj.name}.png`;
            this.itemTitle.innerHTML = obj.name;
            this.itemSubtitle.innerHTML = obj.amount;
        }
    
        if (obj instanceof Squeeb) {
            this.itemImage.src = `images/squeebs/${obj.name}.png`
            this.itemTitle.innerHTML = obj.name;
            this.itemSubtitle.innerHTML = obj.modifier;
        }
    }
}

// A class representing a progress bar.
class ProgressBar {
    constructor(inner, outer, maxTime = 1000) {
        this.outer = outer;
        this.inner = inner;
        this.maxTime = maxTime;
        this.currentTime = 0;

        this.active = false;
    }

    // Reset the bar
    resetBar() {
        this.inner.style.width = 0;
        this.currentTime = 0;
        this.active = false;
    }

    // Start the bar with a given time in milliseconds.
    start(time) {
        this.resetBar();
        this.maxTime = time;
        this.active = true; 
    }

    // Update the bar's width based on the elapsed time.
    updateBar(deltaTime) {
        if (this.active) {
            this.currentTime += deltaTime;

            if (this.currentTime > this.maxTime) {
                this.currentTime = this.maxTime;
            }

            this.inner.style.width = (((this.currentTime / this.maxTime) * 100) + "%");
        }
       
    }
}

// A class representing a generic activity that a squeeb completes.
class Activity {
    constructor(length, div, bar, squeebSelector, button, results, collection, materials) {
        this.length = length;
        this.calculatedLength = length;

        this.div = div;
        this.bar = bar;
        this.squeebSelector = squeebSelector;
        this.results = results;
        this.button = button;
        this.collection = collection;
        this.materials = materials;
        
        this.speed = 1;

        this.activity = this;

        this.going = false;

        this.squeebSelector.activity = this;

        this.currentSqueeb = null;

        this.endFunction = null;
        
        this.button.onclick = (e) => { this.start(); }

        this.timeoutIds = [];
    }

    // Reset necessary variables, and start the activity loop.
    start() {
        if (this.currentSqueeb != null) {
            if (this.going == true) {
                this.stop();
            }
            
            else {
                this.going = true;

                this.results.innerHTML = "";
    
                this.bar.resetBar()
    
                this.beginActivity();
            }
        }
    }

    // Start the bar and prepare endActivity to run in a set time.
    beginActivity() {
        let activity = this.activity;
        this.calculatedLength = (this.length / this.currentSqueeb.modifier) / this.speed;

        this.bar.start(this.calculatedLength);

        this.timeoutIds.push(setTimeout(function() {activity.endActivity()}, this.calculatedLength));
    }

    // Reset the activity and restart it.
    endActivity() {
        if (this.going) {
            this.bar.resetBar();
            this.beginActivity();
        }
    }

    // Stop the activity and prevent endActivity from running.
    stop() {
        this.going = false;
        this.bar.resetBar();

        for (let id of this.timeoutIds) {
            clearTimeout(id);
        }

    }
}

class Adventure extends Activity {

    constructor (length, div, bar, squeebSelector, button, results, lootTable, collection, materials) {
        super(length, div, bar, squeebSelector, button, results, collection, materials);
        this.lootTable = lootTable;

        button.onclick = (e) => {this.startAdventure()};
    }

    // Reset necessary variables, and start the adventure loop.
    startAdventure() {
        if (this.currentSqueeb != null) {

            if (this.going == true) {
                this.stop();
            }
            
            else {
                this.going = true;

                this.results.innerHTML = "";
    
                this.bar.resetBar()
    
                this.beginActivity();
                this.beginAdventure();
            }
        }
    }

    // Start timing the end of the adventure.
    beginAdventure() {

        let adventure = this;

        this.timeoutIds.push(setTimeout(function() {adventure.endAdventure()}, this.calculatedLength));
    }

    // Give the player a reward, and restart the adventure.
    endAdventure() {
        if (this.going) {
            let reward = this.lootTable.getReward();

            if (reward instanceof Squeeb) {
                this.results.innerHTML = `${this.currentSqueeb.name} squeeb found the ${reward.name} squeeb! squeebtastic!`;
                this.collection.addSqueeb(reward);
            }
            if (reward instanceof Material) {
                this.results.innerHTML = `${this.currentSqueeb.name} squeeb found ${reward.amount} ${reward.name}!`;
                this.materials.addMaterial(reward);
            }

            this.beginAdventure();
        }
    }
}

// A class representing a selector for squeebs.
class SqueebSelector {
    constructor(selector, image, namebox, collection) {
        this.selector = selector;
        this.image = image;
        this.namebox = namebox;
        this.collection = collection;

        this.activity = null;

        image.src = "images/blank.png";

        this.selector.onclick = (e) => { this.updateSelector(); this.updateImage(); this.updateTextBox(); this.updateCurrentSqueebInActivity(); this.activity.stop();};
        this.selector.onchange = (e) => { this.updateImage(); this.updateCurrentSqueebInActivity();};
    }

    // Update the options in the selector.
    updateSelector() {
        let children = this.selector.children;
        let currentNames = [];

        for (let o of children) {
            currentNames.push(o.value);
        }

        for (let s of this.collection.list) {
            if (!currentNames.includes(s.name)) {
                this.addOption(s);
            }
        }
    }

    // Update the squeeb for the activity.
    updateCurrentSqueebInActivity() {
        this.activity.currentSqueeb = this.getSqueebFromChoice();
    }

    // Update the text box.
    updateTextBox() {
        this.namebox.innerHTML = this.getSqueebFromChoice().name;
    }

    // Add an option to the selector.
    addOption(s) {
        let option = document.createElement("option");

        option.value = s.name;
        option.innerHTML = s.name;

        this.selector.appendChild(option)
    }

    // Update the image.
    updateImage() {
        this.image.src = `images/squeebs/${this.getSqueebFromChoice().name}.png`
    }

    // Get the current squeeb from the selector.
    getSqueebFromChoice() {
        if (this.selector.children.length == 0) {
            return null;
        }
        let currentName = this.selector.value;

        for (let s of this.collection.list) {
            if (s.name == currentName) {
                return s;
            }
        }
    }
}

// A class representing a generic table of loot.
class LootTable {
    constructor(odds, rewards) {
        this.odds = odds;
        this.rewards = rewards;
    }

    // Get a random reward based on weighted odds.
    getReward() {
        let sumWeights = 0;
        for (let o of this.odds) {
            sumWeights += o;
        }

        let random = Math.random() * sumWeights;

        let running = 0;

        let reward = null;
        let index = 0;

        for (let i in this.odds) {
            running += this.odds[i];
            if (running > random && reward == null) {
                reward = this.rewards[i];
                index = i;
            }
        }

        if (reward instanceof Squeeb) {
            this.odds.splice(index, 1);
            this.rewards.splice(index, 1);
        }
        return reward;
    }
}