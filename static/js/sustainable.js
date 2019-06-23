function initMap() {

	// pick center coordinates for your map
    var myMapCenter = {lat: 51.427251, lng: -0.328046};

	// create map and say which HTML element it should appear in
	var map = new google.maps.Map(document.getElementById('map'), {
		center: myMapCenter,
        zoom: 8});

    var stores = [
        {
            name: 'The Refill Pantry',
            location: {lat: 51.750592, lng: -0.338889},
            hours: '10am to 5pm'
        },
        {
            name: 'Hetu - Vegan Zero Waste Store',
            location: {lat: 51.459822, lng: -0.178370},
            hours: '11am to 9pm'
        },
        {
            name: 'Hetu - Vegan Zero Waste Store',
            location: {lat: 51.459822, lng: -0.178370},
            hours: '11am to 9pm'
        },
    ];

    function markStore(storeInfo){

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
            map: map,
            position: storeInfo.location,
            title: storeInfo.name
        });
    
        // show store info when marker is clicked
        marker.addListener('click', function(){
            showStoreInfo(storeInfo);
        });
    }
        
    // show store info in text box
    function showStoreInfo(storeInfo){

        var info_div = document.getElementById('info_div');
        info_div.innerHTML = 'Store name: '
            + storeInfo.name
            + '<br>Hours: ' + storeInfo.hours;
    };
    stores.forEach(function(store){
        markStore(store);
    });
}

function searchLocations(e) {
    // document.getElementById("searchButton").addEventListener("submit", function(event){
    //     event.preventDefault()
    // });
    console.log(e);
    e.preventDefault();
    var address = document.getElementById("addressInput").value;
    console.log(address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0].geometry.location);
       console.log(searchLocationsNear(results[0].geometry.location));
      } else {
        alert(address + ' not found');
      }
    });
  }