const url = "http://localhost:8081/customers/all";
const urlByRow = "http://localhost:8081/customers/getByRowAmount?rows=2";
// const urlShort = "http://localhost:8081/";

//function to pull data from server when search button clicked
function requestCustomers() {
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
            generateCustomerCards(ourData);
        };
}

function requestCustomersByRowNumber() {
    //clears out any previously displayed data
    document.getElementById("card-container").innerHTML = "";
    //request to server
    const ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', urlByRow);
    ourRequest.send();
    ourRequest.onload =
        //use json function to read the text from the response and split into a javascript array
        function () {
            let ourData = JSON.parse(ourRequest.responseText);
            generateCustomerCards(ourData);
        };
}

function generateCustomerCards(data) {

    for (let object of data) {
        let fName = object.fname;
        console.log(fName);
            let cardContainer = document.getElementById('card-container');

            let card = document.createElement('div');
            card.className = 'card col-sm-4';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body bg-info';

            let name = document.createElement('h3');
            name.innerHTML = object.fname + " " + object.lname;

            let phone = document.createElement('p');
            phone.innerHTML = "Phone: " + object.phone;

            let email = document.createElement('p');
            email.innerHTML = "Email: " + object.email;

            cardBody.appendChild(name);
            cardBody.appendChild(phone);
            cardBody.appendChild(email);
            card.appendChild(cardBody);
            cardContainer.appendChild(card);

    }
}

