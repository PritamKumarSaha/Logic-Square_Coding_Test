document.addEventListener("DOMContentLoaded", function() {
    fetchCafes();
});
function fetchCafes() {
    fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json").then(function(response) {
        return response.json();
    }).then(function(cafes) {
        fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json").then(function(response) {
            return response.json();
        }).then(function(places) {
            displayCafes(cafes, places);
        }).catch(function(error) {
            console.error("Error in fetching places", error);
        });
    }).catch(function(error) {
        console.error("Error in fetching places", error);
    });
}
function displayCafes(cafes, places) {
    var cafeList = document.getElementById("cafeList");
    cafeList.innerHTML="";
    cafes.forEach(function(cafe) {
        var placeDetails = places.find(function(place) {
            return place.id === cafe.place_id;
        });
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${cafe.name}</td>
            <td>${placeDetails.street_no}</td>
            <td>${placeDetails.locality}</td>
            <td>${placeDetails.postal_code}</td>
            <td>${placeDetails.lat}</td>
            <td>${placeDetails.long}</td>
        `;
        cafeList.appendChild(row);
    });
}
function serachCafes() {
    var searchTerm = document.getElementById("searchBox").value.toLocaleLowerCase();
    var allRows = document.querySelectorAll("#cafeList tr");
    allRows.forEach(function(row) {
        var cafeName = row.querySelector("td:first-child").textContent.toLocaleLowerCase();
        if(cafeName.includes(searchTerm)) {
            row.style.display ="";
        }
        else {
            row.style.display ="none";
        }
    });
    
}