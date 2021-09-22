//let btn = document.getElementById("btn");
//let listingCont = document.getElementById("listing-cont");
const url = "http://3.21.225.172:8080/api/realestate/all";
const urlShort = "http://3.21.225.172:8080/api/";
let minPrice = 0;
let maxPrice = 10000000000000000000;
let imgId = "house-7.jpg"
let correctObject;
let selectedHouse;

//FUNCTIONS FOR INDEX PAGE (HOME PAGE)
//function to pull data from server on page load event
function displayTopHouses() {
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.send();
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //call function to get listing with highest price, biggest square footage,
            // most rooms and most bathrooms and insert correct IMGURL into img element
            // for a fading image slide show of houses with top values
            document.getElementById("expensive").src = bestHouseFinder(ourData, "price");
            document.getElementById("big").src = bestHouseFinder(ourData, "sqft");
            document.getElementById("rooms").src = bestHouseFinder(ourData, "beds");
            document.getElementById("baths").src = bestHouseFinder(ourData, "baths");
        };
}

//function to find the top values throughout the entire array of houses
//uses a loop to iterate through each house object
function bestHouseFinder(arrayOfHouseObjects, searchParameter) {
    //Initializing the number to beat as zero
    let numberToBeat = 0;
    //Initializing best house object as an empty object
    let bestHouse = {};
    //This for loop iterates over the array of objects given to it
    for (let house of arrayOfHouseObjects) {
        //Object.values(house) returns all the values in the house object in an array
        //Object.keys(house) returns all of the keys in the house object in an array
        //Object.keys(house).indexOf(searchParameter) returns the index of the keyword
        if (Number(Object.values(house)[Object.keys(house).indexOf(searchParameter)]) > numberToBeat) {
            //If the house.price is greater than the number to beat, this will dod two things
            //It will change the number to beat to house.price, then, it will set the best house to the house object
            numberToBeat = Number(Object.values(house)[Object.keys(house).indexOf(searchParameter)]);
            bestHouse = house;
        }
        //It will then iterate through the array again and if house.price > the number to beat, the if statement will fire off again
        //If not it will do nothing
    }
    //It will return the house that had the highest value with the parameter specified
    console.log(urlShort + bestHouse.imageurl);
    return urlShort + bestHouse.imageurl;
}

//FUNCTIONS FOR LISTINGS PAGE
//function to pull data from server when search button clicked
function requestListings() {
    //request user entered parameter to determine low price and high price
    // if fields left empty keep values as set above
    if (document.getElementById("min_price").value !== "") {
        minPrice = document.getElementById("min_price").value
    }
    if (document.getElementById("max_price").value !== "") {
        maxPrice = document.getElementById("max_price").value
    }
    //clears out any previously displayed data
    document.getElementById("card-container").innerHTML = "";
    //request to server
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.send();
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            generateCards(ourData);
        };
}

//function to create and fill card elements with results
//takes array of houses as an argument
function generateCards(data) {

    for (let object of data) {
        let listingPrice = object.price;
        console.log(listingPrice);
        if (listingPrice >= minPrice && listingPrice <= maxPrice) {
            let cardContainer = document.getElementById('card-container');

            let card = document.createElement('div');
            card.className = 'card col-sm-4';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body bg-info';

            let price = document.createElement('h3');
            let dollarUSLocale = Intl.NumberFormat('en-US');
            let displayPrice = dollarUSLocale.format(object.price);
            price.innerHTML = "$" + displayPrice;

            let sqft = document.createElement('p');
            sqft.innerHTML = object.beds + " bed  " + object.baths + " baths  " + object.sqft + " sqft ";

            let pic = document.createElement('img')
            let imgURL = urlShort + object.imageurl;
            pic.src = imgURL;

            pic.className = 'card-img-top img-fluid';
            pic.id = object.imageurl;
            pic.onclick = function () {
                imgId = this.id;
                console.log(imgId);

                displaySelectedHouse();
            }

            cardBody.appendChild(price);
            cardBody.appendChild(sqft);
            cardBody.appendChild(pic);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);
        }
    }
}

//FUNCTIONS FOR LISTINGS PAGE WHEN DISPLAYING DETAILS
//function to pull data from server when an image from listings page is clicked
function displaySelectedHouse() {
    document.getElementById("card-container").innerHTML = "";
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.send();
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //call function to use image id clicked on to determine what data display
            let houseToDisplay = getSelectedHouse(ourData);
            //call function that creates and displays crad with house details
            displayHouseDetails(houseToDisplay);
        };
}

//uses saved image element id from image clicked on by user to determine which listing needs to be displayed
function getSelectedHouse(data) {
    correctObject = false;
    for (let object of data) {
        if (object.imageurl == imgId) {
            correctObject = true;
        }
        console.log(correctObject);
        if (correctObject == true) {
            selectedHouse = object;
            break;
        }
    }
    return selectedHouse;
}

//Creates the card element to house the selected houses details
// takes single house object as an argument
function displayHouseDetails(house) {
    document.getElementById("card-container").innerHTML = "";
    console.log(house.price);
    let imgString = urlShort + house.imageurl;
    console.log(imgString);
    let cardContainer = document.getElementById('card-container');

    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body bg-info';

    let price = document.createElement('h3');
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let displayPrice = dollarUSLocale.format(house.price);
    price.innerHTML = "Listing Price: $" + displayPrice;

    let sqft = document.createElement('p');
    sqft.innerHTML = house.beds + " bed  " + house.baths + " baths  " + house.sqft + " sqft ";

    let address = document.createElement('p');
    address.innerHTML = house.street + ", " + house.city + ", " + house.state + " " + house.zip;

    //displays info about age of house - if new build then states so
    let age = document.createElement('p');
    const year = new Date(house.yrblt);
    console.log(house.isnew);
    if (house.isnew) {
        age.innerHTML = "NEW BUILD " + "Year Built: " + year.getFullYear().toString();
    }
    else {
        age.innerHTML = "Year Built: " + year.getFullYear().toString();
    }

    let pic = document.createElement('img')
    let imgURL = urlShort + house.imageurl;
    pic.src = imgURL;
    pic.className = 'card-img-top small img-fluid mx-auto d-block';
    pic.id = house.imageurl;

    let realtor = document.createElement('p');
    realtor.innerHTML = "Presented by: " + house.fname + " " + house.lname;

    let broker = document.createElement('p');
    broker.innerHTML = "Brokered by: " + house.listing;

    let phone = document.createElement('p');
    phone.innerHTML = "Phone: " + house.phone;

    //puts all created detail elements into card container
    cardBody.appendChild(price);
    cardBody.appendChild(sqft);
    cardBody.appendChild(address);
    cardBody.appendChild(age);
    cardBody.appendChild(pic);
    cardBody.appendChild(realtor);
    cardBody.appendChild(broker);
    cardBody.appendChild(phone);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}
