var map;
function initMap() {
    var myLatlng = new google.maps.LatLng(45.815399,15.966568);
    var myOptions = {
        zoom: 7,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    map.setOptions({draggableCursor:'crosshair'});

    marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    google.maps.event.addListener(map, "click", function(event) {
    
        var clickLat = event.latLng.lat();
        var clickLng = event.latLng.lng();

    
        document.getElementById("lat").value = clickLat.toFixed(5);
        document.getElementById("lng").value = clickLng.toFixed(5);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(clickLat,clickLng),
            map: map
        });
    });
} 