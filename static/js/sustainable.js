//global variables
var map;
var markers = [];
var stores = [];     
var infoWindow;
var service;

function initMap() {

	// sets center coordinates for map
    var myMapCenter = {lat: 51.427251, lng: -0.328046};

	// creates map and says which HTML element it should appear in
	map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
        zoom: 8,
        mapTypeId: 'hybrid'
    });
    
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
}

function searchLocations(event) {
    event.preventDefault(); //submit event has a default behaviour of refreshing the page, this will stop that.
    var location = document.getElementById("addressInput").value; //takes the value from the address input in the form
    var geocoder = new google.maps.Geocoder(); //geocoder is a class in the google maps javascript api
    geocoder.geocode({address: location}, function(results, status) { //geocode function takes two arguments, an address and a callback function
      if (status == google.maps.GeocoderStatus.OK) {
       searchLocationsNear(results[0].geometry.location);
      } else {
        alert(location + ' not found');
      }
    });


function searchLocationsNear(location) {
    clearLocations();

    var bounds = new google.maps.LatLngBounds();
    var destinationAddress;

    service.getDistanceMatrix({
        origins: [{ lat: location.lat(), lng: location.lng()}], //list containing latitude and longitude of location
        destinations: stores.map(function(store) { //map is a function that can be applied to any list, it takes an argument which is a function to be applied to each element in the list
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
            map.setZoom(19);
        }
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
        position: latlng,
        animation: google.maps.Animation.DROP,
        icon: '../static/img/jar.png'
    });
    infoWindow.setContent(html);
    infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
    }
  }

//image scroll 

$(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    if(wScroll > $('.container').offset().top - ($(window).height() / 1.2)) {
  
      $('.container img').each(function(i){
  
        setTimeout(function(){
        $('.container img').eq(i).addClass('is-showing');
      }, 350 * (i+1));
      });
    }
  });