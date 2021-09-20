let btn = document.getElementById("btn");
let listingCont = document.getElementById("listing-cont");
const url = "http://3.21.225.172:8080/api/realestate/all";
const urlShort = "http://3.21.225.172:8080/api/";
let minPrice = 0;
let maxPrice = 10000000000000000000;
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
let mostExpensiveHouse = exampleHouse;
//functions for home page
function displayTopHouses() {
    const requestURL = url;
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', requestURL);
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            //call function to get listing with highest price and insert correct IMGURL into img element
            document.getElementById("expensive").src = findHighestPrice(ourData);
            document.getElementById("big").src = findBiggestHouse(ourData);
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
//functions for listings page
function requestListings() {
    //request user entered parameter to determine low price and high price -- if fields left empty keep values as set above
    if (document.getElementById("min_price").value !== "") {
        minPrice = document.getElementById("min_price").value
    }
    if (document.getElementById("max_price").value !== "") {
        maxPrice = document.getElementById("max_price").value
    }
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
    const fields = ["First Name", "Last Name", "Year Built", "New Build", "Square Ft.", "Baths", "Beds", "Street", "City", "State", "Zip", "price", "phone", "Listing", "Photo"];
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
    for (let object of data){
        for (let field in object) {
            if (field == "price") {
                let listingPrice = object[field];
                console.log(listingPrice);
                console.log(minPrice);
                console.log(maxPrice);
                if (listingPrice >= minPrice && listingPrice <= maxPrice) {
                    for (let element of data) {
                        let row = table.insertRow();
                        for (let key in element) {
                            if (key !== "id"){
                                if (key !== "imageurl") {
                                    let cell = row.insertCell();
                                    let text = document.createTextNode(element[key]);
                                    cell.appendChild(text);
                                    console.log(element[key] + key);
                                }
                                else {
                                    //displays the image in the last column, cell.appendChild(<img width=100 height=100 src='shortURL +
                                    let cell = row.insertCell();
                                    let imgURL = urlShort + element[key];
                                    console.log(imgURL);
                                    let picName = element[key];
                                    let text = "<a id= '" + picName + "' href='details.html'><img height=100 width=160 src='" + urlShort + element[key] + "' /></a>";
                                    //testing   let text = "<a id= '" + picName + "' " + "onclick= '" + setPicName() "' + href='details.html'><img height=100 width=100 src='" + urlShort + element[key] + "' /></a>";
                                    console.log(text);
                                    // document.createTextNode(text);
                                    // document.createTextNode(element[key]);
                                    cell.innerHTML = text;
                                    console.log(cell.innerHTML);
                                }

                            }


                        }
                    }


                }

            }
        }

    }

}