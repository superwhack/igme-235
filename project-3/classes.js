class Squeeb {
    constructor(name, modifier) {
        this.name = name;
        this.modifier = modifier;
        this.active = false;
    }
}

class Material {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

class PlayerCollection {
    constructor(list, visualInventory) {
        this.list = list;
        this.visualInventory = visualInventory;
    }

    addSqueeb(s) {
        let currentNames = [];
        for (let sq of this.list) {
            currentNames.push(sq.name);
        }

        if (!currentNames.includes(s.name)) {
            this.list.push(s);
            this.visualInventory.populateVisualInventory(this.list);
        }
        else {
            return false;
        }
    }

    populateCollectionInventory() {
        this.visualInventory.populateVisualInventory(this.list)
    }
}

class PlayerMaterials {
    constructor(list, visualInventory) {
        this.list = list;
        this.visualInventory = visualInventory;
    }

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

    populateMaterialInventory() {
        this.visualInventory.populateVisualInventory(this.list)
    }

    getMaterialFromName(name) {
        for (let material of this.list) {
            if (material.name == name) {
                return material;
            }
        }
        return null;
    }
}

class VisualInventory {
    constructor(div) {
        this.div = div;
        this.boxList = [];
    }

    populateVisualInventory(list) {
        this.clearVisualInventory();
        
        for (let s of list) {
            this.createVisualInventoryBox(s);
        }
    }

    clearVisualInventory() {
        this.div.innerHTML = "";
    }

    createVisualInventoryBox(obj) {
        let inventoryBox = new InventoryBox(obj);

        this.div.appendChild(inventoryBox.box);
        this.boxList.push(inventoryBox);
    }

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

class SqueebDictionary {
    constructor() {
        this.validSqueebs = [
            ["beebus", 3.7],
            ["boots", 2.1],
            ["choir", 2.5],
            ["energily", 2.6],
            ["fluff", 3.2],
            ["friends", 2.2],
            ["gooey", 2.0],
            ["goofy", 2.5],
            ["hook", 2.3],
            ["hug", 1.5],
            ["jaw", 1.6],
            ["length", 2.5],
            ["loopsy", 2.7],
            ["pop", 1.8],
            ["prime", 1.0],
            ["reflex", 2.2],
            ["scruff", 3.5],
            ["see", 2.4],
            ["sprite", 1.9],
            ["squat", 1.7],
            ["squeeze", 1.6],
            ["staple",1.6],
            ["velvet", 1.5],
            ["royal", 5.0]
        ]
    }

    retrieveValidSqueeb(name) {
        for (let squeeb of this.validSqueebs) {
            if (squeeb[0] == name) {
                return new Squeeb(squeeb[0], squeeb[1]);
            }
        }
        
        return null;
    }

}

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

    retrieveValidMaterial(name, amount) {
        if (this.validMaterials.includes(name)) {
            return new Material(name, amount);
        }

        else {
            return null;
        }
    }
}

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

class ProgressBar {
    constructor(inner, outer, maxTime = 1000) {
        this.outer = outer;
        this.inner = inner;
        this.maxTime = maxTime;
        this.currentTime = 0;

        this.active = false;
    }

    resetBar() {
        this.inner.style.width = 0;
        this.currentTime = 0;
        this.active = false;
    }

    start(time) {
        this.resetBar();
        this.maxTime = time;
        this.active = true; 
    }

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

        this.button.onclick = (e) => { this.start(); }

        this.timeoutIds = [];
    }

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

    beginActivity() {
        let activity = this.activity;
        this.calculatedLength = (this.length / this.currentSqueeb.modifier) / this.speed;

        this.bar.start(this.calculatedLength);

        this.timeoutIds.push(setTimeout(function() {activity.endActivity()}, this.calculatedLength));
    }

    endActivity() {
        if (this.going) {
            this.bar.resetBar();
            this.beginActivity();
        }
    }

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

    startAdventure() {
        if (this.currentSqueeb != null) {

            if (this.going == true) {
                this.stop();
            }
            
            else {
                this.going = true;

                this.results.innerHTML = "";
    
                this.bar.resetBar()
    
                this.beginAdventure();
            }
        }
    }

    beginAdventure() {

        let adventure = this;
        this.beginActivity();

        let activity = this.activity;

        this.timeoutIds.push(setTimeout(function() {adventure.endAdventure()}, this.calculatedLength));
    }

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

            this.endActivity();

            this.beginAdventure();
        }
    }
}

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

    updateCurrentSqueebInActivity() {
        this.activity.currentSqueeb = this.getSqueebFromChoice();
    }
    updateTextBox() {
        this.namebox.innerHTML = this.getSqueebFromChoice().name;
    }

    addOption(s) {
        let option = document.createElement("option");

        option.value = s.name;
        option.innerHTML = s.name;

        this.selector.appendChild(option)
    }

    updateImage() {
        this.image.src = `images/squeebs/${this.getSqueebFromChoice().name}.png`
    }

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

class LootTable {
    constructor(odds, rewards) {
        this.odds = odds;
        this.rewards = rewards;
    }

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
            this.odds.splice(index, index);
            this.rewards.splice(index, index);
        }
        return reward;
    }
}