var btn = document.getElementById("btn");
var listingCont = document.getElementById("listing-cont");
const url = "http://3.21.225.172:8080/api/realestate/getByRowAmount?rows=5";

function requestListings() {
    console.log("hello1");
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url)
    ourRequest.onload =
        function () {
        console.log("hello2");
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
        ourRequest.send();
    }
function updateData() {

}
function renderHTML(data) {
    var htmlString = "";
    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].price + "</p><br>";
        console.log(htmlString);
        listingCont.insertAdjacentHTML('beforeend', htmlString);
    }
   /*     $.each(data, function (i, item) {
            var html =
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>"
                "<td>" + item.fname + "</td>";
            $("<tr/>").html(html).appendTo("#records");
        }); */
};
updateData();