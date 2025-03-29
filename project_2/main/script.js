    let pokemonList = [];

    let loaded = false;

    let pokemonBox = document.querySelector("p");

    function AorAn(string) {
        switch (string.toLowerCase()[0]) {
            case "a":
            case "e": 
            case "i":
            case "o":
            case "u":
                return "an ";
            default: 
                return "a ";
        }
    }

    function MakePokemon(name, form, gen) {
        let pokemon = {
            name: name,
            form: form,
            gen: gen,
            ToString: function() {
                if (form == " ") {
                    return name;
                }
                else {
                    return name + ": " + form;
                }
            }
        };

        return pokemon;
    }

    async function LoadData() {
        fetch("data/Pokemon.csv")
        .then(async response => {if (await response.ok) {return response.text()}})
        .then(async text => {ProcessData(await text)});
    }

    function ProcessData(csvData) {
        let cleanData = csvData.replaceAll('"', "");
        let splitData = cleanData.split("\n");

        for (let i = 1; i < splitData.length - 1; i++) {
            let current = splitData[i].split(",");
            let pokemon = MakePokemon(current[1], current[2], current[12]);
            pokemonList.push(pokemon);
        }

        loaded = true;
        console.log(pokemonList);
        console.log(pokemonList[28].ToString());
    }

    function PickAPokemon() {
        
    }

    LoadData();


