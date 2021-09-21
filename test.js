let btn = document.getElementById("btn");
let listingCont = document.getElementById("listing-cont");
const url = "http://3.21.225.172:8080/api/realestate/all";
const urlShort = "http://3.21.225.172:8080/api/";
let minPrice = 0;
let maxPrice = 10000000000000000000;
let imgId = "house-7.jpg"
let correctObject = false;
const exampleHouse = {
    id: 2091,
    fname: "Dorci'A",
    lname: "Rannila",
    yrblt: "2018-06-06T22:45:52.247Z",
    price: 500000,
    new: true,
    sqft: 6200,
    baths: 7,
    beds: 4,
    street: "1484 Massa Ct",
    city: "Collierville",
    state: "TN",
    zip: 38027,
    listing: "MIDSOUTH RESIDENTIAL LLC",
    image: "house-7.jpg"
};
let selectedHouse = exampleHouse;

//FUNCTIONS FOR INDEX PAGE (HOME PAGE)
function displayTopHouses() {
    const requestURL = url;
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', requestURL);
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //call function to get listing with highest price, biggest square footage, most rooms and most bathrooms and insert correct IMGURL into img element
            document.getElementById("expensive").src = findHighestPrice(ourData);
            document.getElementById("big").src = findBiggestHouse(ourData);
            document.getElementById("rooms").src = findMostRooms(ourData);
            document.getElementById("baths").src = findMostBaths(ourData);
        };
    ourRequest.send();
}


function findHighestPrice(data) {
    let highestPrice = 0;
    let mostExpensiveObject = data[0];
    let mostExpensiveImg = "http://3.21.225.172:8080/api/house-1.jpg"
    for (let house in data) {
        for (let object of data) {
            let imgLink = object.imageurl;
            for (let field in object) {
                if (field == "price") {
                    let listingPrice = object[field];
                    if (listingPrice > highestPrice) {
                        highestPrice = listingPrice;
                        mostExpensiveImg = urlShort + imgLink;
                        mostExpensiveObject = object;
                    }
                }
            }

        }
    }
    return mostExpensiveImg;
}
function findBiggestHouse(data) {
    let biggestHouse = 0;
    let biggestHouseImg = "http://3.21.225.172:8080/api/house-1.jpg"
    for (let house in data) {
        for (let object of data) {
            let imgLink = object.imageurl;
            for (let field in object) {
                if (field == "sqft") {
                    let listingSqft = object[field];
                    if (listingSqft > biggestHouse) {
                        biggestHouse = listingSqft;
                        biggestHouseImg = urlShort + imgLink;
                    }
                }
            }

        }
    }
    console.log(biggestHouse);
    return biggestHouseImg;
}

function findMostRooms(data) {
    let mostRooms = 0;
    let mostRoomsImg = "http://3.21.225.172:8080/api/house-1.jpg"
    for (let house in data) {
        for (let object of data) {
            let imgLink = object.imageurl;
            for (let field in object) {
                if (field == "beds") {
                    let listingBeds = object[field];
                    if (listingBeds > mostRooms) {
                        mostRooms = listingBeds;
                        mostRoomsImg = urlShort + imgLink;
                    }
                }
            }

        }
    }
    console.log(mostRooms);
    return mostRoomsImg;
}

function findMostBaths(data) {
    let mostBaths = 0;
    let mostBathsImg = "http://3.21.225.172:8080/api/house-1.jpg"
    for (let house in data) {
        for (let object of data) {
            let imgLink = object.imageurl;
            for (let field in object) {
                if (field == "baths") {
                    let listingBaths = object[field];
                    if (listingBaths > mostBaths) {
                        mostBaths = listingBaths;
                        mostBathsImg = urlShort + imgLink;
                    }
                }
            }

        }
    }
    console.log(mostBaths);
    return mostBathsImg;
}

//FUNCTIONS FOR LISTINGS PAGE
function requestListings() {
    //request user entered parameter to determine low price and high price -- if fields left empty keep values as set above
    if (document.getElementById("min_price").value !== "") {
        minPrice = document.getElementById("min_price").value
    }
    if (document.getElementById("max_price").value !== "") {
        maxPrice = document.getElementById("max_price").value
    }
    if (document.getElementById("details").innerHTML != "") {
        document.getElementById("details").innerHTML = "";
    }
    console.clear();
    console.log(minPrice);
    console.log(maxPrice);
    //add request value to url string to create final url
    const requestURL = url;
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', requestURL);
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //scan through data to determine where there is a match in price
            //calls function that generates table with array ourData
            updateData(ourData);
        };
    ourRequest.send();
}
//function to  change data displayed on page
function updateData(data) {
    //Clear out table data if it exists
    if (document.getElementById("records").innerHTML != ""){
        document.getElementById("records").innerHTML = "";
    }
    //generate updated table data
    let table = document.querySelector("table");
    generateTableHead(table);
    generateTable(table, data);
}
//function to create the row of table header data
function generateTableHead(table) {
    const fields = ["Price", "Square Ft.", "Baths", "Beds", "Photo"];
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let item of fields) {
        let th = document.createElement("th");
        let text = document.createTextNode(item);
        th.appendChild(text);
        row.appendChild(th);
    }
}
//function to create and fill the data fields of the results table
function generateTable(table, data) {
    for (let object of data) {
        let listingPrice = object.price;
        if (listingPrice >= minPrice && listingPrice <= maxPrice) {
            console.log(listingPrice);
            let row = table.insertRow();
            let cell = row.insertCell();
            let text = document.createTextNode(object.price);
            cell.appendChild(text);
            cell = row.insertCell();
            text = document.createTextNode(object.sqft);
            cell.appendChild(text);
            cell = row.insertCell();
            text = document.createTextNode(object.baths);
            cell.appendChild(text);
            cell = row.insertCell();
            text = document.createTextNode(object.beds);
            cell.appendChild(text);
            cell = row.insertCell();
            let imgURL = urlShort + object.imageurl;
            let picName = object.imageurl;
            text = "<button class='link' id= '" + picName + "' onclick='setHouseObject(this.id)'><img height=100 width=160 src='" + imgURL + "' /></button>";
            cell.innerHTML = text;
        }
    }
}

//FUNCTIONS FOR DETAILS PAGE

function displaySelectedHouse() {
    const requestURL = url;
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', requestURL);
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //call function to use image id clicked on to determine what data display
            let houseToDisplay = getSelectedHouse(ourData);
            console.log(houseToDisplay);
            displayHouseDetails(houseToDisplay);
        };
    ourRequest.send();
}

function getSelectedHouse(data) {
    for (let object of data) {
        for (let field in object) {
            if (field == "imageurl") {
                if (object[field] == imgId) {
                    correctObject = true;
                }
            }
        }
        console.log(correctObject);
        if (correctObject == true) {
            selectedHouse = object;
            break;
        }
    }
    return selectedHouse;
}
function displayHouseDetails(house){
    console.log(house.price);
    let imgString = urlShort + house.imageurl;
    console.log(imgString);
    let displayString = "<p>Price: " + house.price + "</p>" +
        "<p>Year Built: " + house.yrblt + "</p>" +
        "<p>Beds: " + house.beds + "</p>" +
        "<p>Baths: " + house.baths + "</p>" +
        "<p><img src='" + imgString + "' height='300px' width='450px' /></p>";
    console.log(displayString);
    document.getElementById("details").innerHTML = displayString;
    //document.writeln(displayString);
}
//executed when image link is clicked to remember which item to display
function setHouseObject(clicked) {
    imgId = clicked;
    console.log(imgId);
    document.getElementById("records").innerHTML = "";
    displaySelectedHouse();
}