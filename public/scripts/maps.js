var map, map2;

function initMap() {
    var myLatlng = new google.maps.LatLng(45.815399,15.966568);
    var myLatlng2 = new google.maps.LatLng(45.815399,12);

    var myOptions = {
        zoom: 7,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        
    }
    var myOptions2 = {
        zoom: 7,
        center: myLatlng2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    map2 = new google.maps.Map(document.getElementById("map2"), myOptions2);

    map.setOptions({draggableCursor:'crosshair'});
    map2.setOptions({draggableCursor:'crosshair'});
    var marker2 = new google.maps.Marker({
        position: myLatlng2,
        map2: map2
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    marker.setMap(map);
    marker2.setMap(map2);

    
    google.maps.event.addListener(map, "click", function(event) {
    
        var clickLat = event.latLng.lat();
        var clickLng = event.latLng.lng();

    
     
        document.getElementById("lat").value = clickLat.toFixed(5);
        document.getElementById("lng").value = clickLng.toFixed(5);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(clickLat,clickLng),
            map: map
        });
        marker.setMap(map);

    });
    google.maps.event.addListener(map2, "click", function(event) {
    
        var clickLat = event.latLng.lat();
        var clickLng = event.latLng.lng();
        
    
     
        document.getElementById("lat_add").value = clickLat.toFixed(5);
        document.getElementById("lng_add").value = clickLng.toFixed(5);
        marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(clickLat,clickLng),
            map2: map2
        });
        marker2.setMap(map2);

    });
  
} 
