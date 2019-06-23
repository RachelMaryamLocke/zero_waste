var map;
var markers = [];
var stores = [];     
var infoWindow;
var service;

function initMap() {

	// pick center coordinates for your map
    var myMapCenter = {lat: 51.427251, lng: -0.328046};

	// create map and say which HTML element it should appear in
	map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
        zoom: 8});
    
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.DistanceMatrixService();

    stores = [
        {
            name: 'The Refill Pantry',
            address: '26 London Rd, St Albans AL1 1NG, UK',
            location: {lat: 51.750592, lng: -0.338889},
            hours: '10am to 5pm'
        },
        {
            name: 'Hetu - Vegan Zero Waste Store',
            address: '201 St John\'s Hill, London SW11 1TH, UK',
            location: {lat: 51.459822, lng: -0.178370},
            hours: '11am to 9pm'
        }
    ];

    // function markStore(storeInfo){

    //     // Create a marker and set its position.
    //     var marker = new google.maps.Marker({
    //         map: map,
    //         position: storeInfo.location,
    //         title: storeInfo.name
    //     });
    
    //     // show store info when marker is clicked
    //     marker.addListener('click', function(){
    //         showStoreInfo(storeInfo);
    //     });
    // }
        
    // // show store info in text box
    // function showStoreInfo(storeInfo){

    //     var info_div = document.getElementById('info_div');
    //     info_div.innerHTML = 'Store name: '
    //         + storeInfo.name
    //         + '<br>Hours: ' + storeInfo.hours;
    // };
    // stores.forEach(function(store){
    //     markStore(store);
    // });
}

function searchLocations(event) {
    event.preventDefault(); //submit event has a default behaviour of refreshing the page, this will stop that.
    var location = document.getElementById("addressInput").value; //takes the value from the address input in the form
    var geocoder = new google.maps.Geocoder(); //geocoder is a class in the google maps javascript api
    geocoder.geocode({address: location}, function(results, status) { //geocode method takes two arguments, an address and a callback function
      if (status == google.maps.GeocoderStatus.OK) {
       searchLocationsNear(results[0].geometry.location);
      } else {
        alert(location + ' not found');
      }
    });


function searchLocationsNear(center) {
    clearLocations();

    // downloadUrl(searchUrl, function(data) {
    // for (var i = 0; i < stores.length; i++) {
    //     var name = stores[i].name;
    //     var address = stores[i].address;
    //     var hours = stores[i].hours;
    //     var latlng = new google.maps.LatLng(
    //         parseFloat(stores[i].location.lat),
    //         parseFloat(stores[i].location.lng));
        
    //     console.log(name, address, latlng);
    //     createMarker(latlng, name, address);
    //     bounds.extend(latlng);
    // }

    var bounds = new google.maps.LatLngBounds();
    var destinationAddress;

    service.getDistanceMatrix({
        origins: [{ lat: center.lat(), lng: center.lng()}],
        destinations: stores.map(function(store) {
            return new google.maps.LatLng(        
                parseFloat(store.location.lat),
                parseFloat(store.location.lng))
        }),
        travelMode: 'DRIVING'
        }, callback);
    
    function callback(response, status) {
            var destination = Math.min.apply(null, response.rows[0].elements.map(item => item.distance.value));
            var index = response.rows[0].elements.findIndex(item => item.distance.value === destination);

            destinationAddress = stores.filter(store => response.destinationAddresses[index] === store.address)[0];
            
            var latlng = new google.maps.LatLng(        
                parseFloat(destinationAddress.location.lat),
                parseFloat(destinationAddress.location.lng))
            createMarker(latlng, destinationAddress.name, destinationAddress.address);
            bounds.extend(latlng);
            map.fitBounds(bounds);
        }
    
    
    // var latlng = new google.maps.LatLng(        
    //     parseFloat(destinationAddress.location.lat),
    //     parseFloat(destinationAddress.location.lng))
    // createMarker(latlng, destinationAddress.name, destinationName.address);
    // bounds.extend(latlng);
    // map.fitBounds(bounds);
    // });
    }

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function createMarker(latlng, name, address) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
    }
  }