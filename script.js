let main = document.querySelector(".main");

fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        let items = data; // Store the data in the items array for filtering

        items.forEach((item, index) => {
            let box = document.createElement("div");
            box.classList.add("box");
            box.dataset.name = (item.name || "").toLowerCase(); // Add a data attribute for easier search
            box.dataset.region = (item.region || "").toLowerCase(); // Add a data attribute for region filtering
            box.dataset.index = index; // Add a data attribute for unique identification
            main.appendChild(box);

            let img = document.createElement("img");
            img.src = item.flags?.svg || "default-image.png"; // Default image if flags.svg is missing
            box.appendChild(img);

            let content = document.createElement("div");
            content.classList.add("content");

            let head = document.createElement("p");
            head.classList.add("head");
            head.innerHTML = item.name || "N/A";
            content.appendChild(head);

            let pop = document.createElement("p");
            pop.classList.add("bold");
            pop.innerHTML = "Population: ";

            let popLight = document.createElement("span");
            popLight.classList.add("light");
            popLight.innerHTML = item.population || "N/A";
            pop.appendChild(popLight);
            content.appendChild(pop);

            let reg = document.createElement("p");
            reg.classList.add("bold");
            reg.innerHTML = "Region: ";

            let regLight = document.createElement("span");
            regLight.innerHTML = item.region || "N/A";
            reg.appendChild(regLight);
            content.appendChild(reg);

            let cap = document.createElement("p");
            cap.classList.add("bold");
            cap.innerHTML = "Capital: ";

            let capLight = document.createElement("span");
            capLight.classList.add("light");
            capLight.innerHTML = item.capital || "N/A";
            cap.appendChild(capLight);
            content.appendChild(cap);

            box.appendChild(content);
            box.addEventListener('click', () => showCountryDetails(item));
            main.appendChild(box);
        });

        // Add options to the region filter dropdown
        addRegionOptions(data);

        // Event listener for search input
        let search = document.querySelector(".search-box");
        search.addEventListener('input', function () {
            let searchText = search.value.toLowerCase();
            displayItems(searchText);
        });

        // Event listener for region filter
        let options = document.getElementById("region");
        options.addEventListener("change", function () {
            let opt = options.value.toLowerCase();
            displayByRegion(opt);
        });
        if (localStorage.getItem('dark-mode') === 'true') {
            toggleDarkMode(true);
        }
    });

// Function to display or hide boxes based on search input
function displayItems(searchText) {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        if (box.dataset.name.includes(searchText)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}

// Function to display country details
function showCountryDetails(item) {
    document.querySelector(".container").style.display = "none";
    const countryDetails = document.querySelector('.country-details');
    countryDetails.style.display = 'flex';
    countryDetails.innerHTML = `
    <div class="contain">
        <button class="con back"> <i class="fas fa-arrow-left"></i>Back</button>
        <img src="${item.flags?.svg || "default-image.png"}" alt="img">
        <div class="details">
            <div class="details-content">
                <div class="left">
                    <p class="head">${item.name || "N/A"}</p>
                    <p class="bold">Native Name: <span class="light">${item.nativeName || "N/A"}</span></p>
                    <p class="bold">Population: <span class="light">${item.population || "N/A"}</span></p>
                    <p class="bold">Region: <span class="light">${item.region || "N/A"}</span></p>
                    <p class="bold">Sub Region: <span class="light">${item.subregion || "N/A"}</span></p>
                    <p class="bold">Capital: <span class="light">${item.capital || "N/A"}</span></p>
                </div>
                <div class="right">
                    <p class="bold">Top Level Domain: <span class="light">${item.topLevelDomain || "N/A"}</span></p>
                    <p class="bold">Currencies: <span class="light">${item.currencies?.map(currency => currency.name).join(', ') || "N/A"}</span></p>
                    <p class="bold">Languages: <span class="light">${item.languages?.map(language => language.name).join(', ') || "N/A"}</span></p>
                </div>
            </div>
            <div class="border">
                <p class="bold">Border Countries: </p>
                <p class="con">${item.borders?.join(", ") || "N/A"}</p>
            </div>
        </div>
    </div>`;
    let back = document.querySelector(".back");
    back.addEventListener("click", () => {
        document.querySelector(".container").style.display = "block";
        countryDetails.style.display = "none";
    });
}

// Function to add region options to the select element
function addRegionOptions(items) {
    let options = document.getElementById("region");
    let regions = new Set();

    items.forEach(item => {
        if (item.region) {
            regions.add(item.region);
        }
    });

    regions.forEach(region => {
        let opt = document.createElement("option");
        opt.value = region;
        opt.innerHTML = region;
        options.appendChild(opt);
    });
}

// Function to display or hide boxes based on region filter
function displayByRegion(region) {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        if (region === "all" || box.dataset.region === region) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}

// Mode toggle
document.querySelector('.mode').addEventListener('click', function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');

    // Optionally, toggle classes on other elements if needed
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.toggle('dark-mode');
    });

    let container = document.querySelector('.container');
    container.classList.toggle('dark-mode');
    
    let bord = document.querySelector('header');
    bord.classList.toggle('dark-mode');

    // Change the button text based on mode
    let modeText = document.querySelector('.mode span');
    if (isDarkMode) {
        modeText.textContent = 'Light Mode';
        modeText.style.color = "white";
    } else {
        modeText.textContent = 'Dark Mode';
        modeText.style.color = "black";
    }

    // Save the current mode to local storage
    localStorage.setItem('dark-mode', isDarkMode);
});

// Function to toggle dark mode based on the input parameter
function toggleDarkMode(enable) {
    if (enable) {
        document.body.classList.add('dark-mode');
        document.querySelector('.mode span').textContent = 'Light Mode';
        document.querySelector('.mode span').style.color = 'white';
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('.mode span').textContent = 'Dark Mode';
        document.querySelector('.mode span').style.color = 'black';
    }

    // Optionally, toggle classes on other elements if needed
    let boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        if (enable) {
            box.classList.add('dark-mode');
        } else {
            box.classList.remove('dark-mode');
        }
    });

    let container = document.querySelector('.container');
    if (enable) {
        container.classList.add('dark-mode');
    } else {
        container.classList.remove('dark-mode');
    }

    let bord = document.querySelector('header');
    if (enable) {
        bord.classList.add('dark-mode');
    } else {
        bord.classList.remove('dark-mode');
    }
}
