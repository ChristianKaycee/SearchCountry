let main = document.querySelector(".main");
fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            let box = document.createElement("div");
            box.classList.add("box");
            main.appendChild(box);

            let img = document.createElement("img");
            img.src = item.flags.svg;
            box.appendChild(img);

            let content = document.createElement("div");
            content.classList.add("content");

            let head = document.createElement("p");
            head.classList.add("head");
            head.innerHTML = item.name;
            content.appendChild(head);

            let pop = document.createElement("p");
            pop.classList.add("bold");
            pop.innerHTML = "Population : ";

            let popLight = document.createElement("span");
            popLight.classList.add("light");
            popLight.innerHTML = item.population;
            pop.appendChild(popLight);
            content.appendChild(pop);

            let reg = document.createElement("p");
            reg.classList.add("bold");
            reg.innerHTML = "Region : ";

            let regLight = document.createElement("span");
            regLight.classList.add("light");
            regLight.innerHTML = item.region;
            reg.appendChild(regLight);
            content.appendChild(reg);

            let cap = document.createElement("p");
            cap.classList.add("bold");
            cap.innerHTML = "Capital : ";

            let capLight = document.createElement("span");
            capLight.classList.add("light");
            capLight.innerHTML = item.capital;
            cap.appendChild(capLight);
            content.appendChild(cap);

            box.appendChild(content);
            box.addEventListener('click', () => showCountryDetails(item));
            main.appendChild(box);

            function addOption(item) {
                let options = document.getElementById("region");
                let exists = false;

                // Check if the option already exists
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === item.region) {
                        exists = true;
                        break;
                    }
                }

                // If it doesn't exist, add the new option
                if (!exists) {
                    let opt = document.createElement("option");
                    opt.value = item.region;
                    opt.innerHTML = item.region;
                    options.appendChild(opt);
                }
            }

            // Add options from items array
            data.forEach(addOption);
        });
    });

// Function to display country details
function showCountryDetails(item) {
    document.querySelector(".container").style.display = "none";
    const countryDetails = document.querySelector('.country-details');
    countryDetails.style.display = 'flex';
    countryDetails.innerHTML = `
    <div class="contain">
    <button class="con back">Back</button>
        <img src="${item.flags.svg}" alt="img">
        <div class="details">
            <div class="details-content">
                <div class="left">
                    <p class="head">${item.name}</p>
                    <p class="bold">Native Name : <span class="light">${item.name}</span></p>
                    <p class="bold">Population : <span class="light">${item.population}</span></p>
                    <p class="bold">Region : <span class="light">${item.region}</span></p>
                    <p class="bold">Sub Region : <span class="light">${item.subregion}</span></p>
                    <p class="bold">Capital : <span class="light">${item.capital}</span></p>
                </div>
                <div class="right">
                    <p class="bold">Top Level Domain : <span class="light">${item.topLevelDomain}</span></p>
                    <p class="bold">Currencies : <span class="light">${item.currencies.map(currency => currency.name).join(', ')}</span></p>
                    <p class="bold">Languages : <span class="light">${item.languages.map(language => language.name).join(', ')}</span></p>
                </div>
            </div>
            <div class="border">
                <p class="bold">Border Countries: </p>
                <p class="con">${item.borders.map(border => border).join(",")}</p>
            </div>
        </div>
    </div>`;
    let back = document.querySelector(".back");
    back.addEventListener("click", (e) => {
        document.querySelector(".container").style.display = "block";
        countryDetails.style.display = "none";
    });
}
