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
    let mostExpensiveImg = "http://3.21.225.172:8080/api/house-7.jpg"
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
    let biggestHouseImg = "http://3.21.225.172:8080/api/house-7.jpg"
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
    let mostRoomsImg = "http://3.21.225.172:8080/api/house-7.jpg"
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
    let mostBathsImg = "http://3.21.225.172:8080/api/house-7.jpg"
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
    document.getElementById("card-container").innerHTML = "";

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
            generateCards(ourData);
        };
    ourRequest.send();
}

//function to create and fill card elements with results

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

            pic.className = 'card-img-top img-fluid mx-auto d-block';
            pic.id = object.imageurl;
            pic.onclick = function () {
                imgId = this.id;
                console.log(imgId);

                displaySelectedHouse();
            }


            cardBody.appendChild(price);
            cardBody.appendChild(sqft);
            cardBody.appendChild(pic);
            //card.appendChild(cardHeader);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);
        }
    }
}

//FUNCTIONS FOR DETAILS PAGE

function displaySelectedHouse() {
    document.getElementById("card-container").innerHTML = "";
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
    pic.className = 'card-img-top img-fluid mx-auto d-block';
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
