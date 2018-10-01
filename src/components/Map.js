import React, { Component } from 'react';
class Map extends Component {



  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAt9UrH46XScWw9mlJrgHK69emSizD-Q2s`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }



  onScriptLoad() {
    var map;
    map = new window.google.maps.Map(
      document.getElementById('map'), {
                center: {lat: 40.7413549, lng: -73.9980244},
                zoom: 13
              });

              var markers = [];
              var locations = [
                {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
                {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
                {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
                {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
                {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
                {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
              ];
              var largeInfowindow = new window.google.maps.InfoWindow();
              var bounds = new window.google.maps.LatLngBounds();


              for (var i = 0; i < locations.length; i++) {
                // Get the position from the location array.
                var position = locations[i].location;
                var title = locations[i].title;
                // Create a marker per location, and put into markers array.
                var marker = new window.google.maps.Marker({
                  map: map,
                  position: position,
                  title: title,
                  animation: window.google.maps.Animation.DROP,
                  id: i
                });
                markers.push(marker);

                marker.addListener('click', (marker) => {
                  this.createInfoWindow(marker, map)
                })

              }
  }

  createInfoWindow(marker, map) {
      const infoWindow = new window.google.maps.InfoWindow({
//          content: '<div id="infoWindow" />',
          content: '<div>' + marker.title + '</div>',
          position: { lat: marker.latLng.lat(), lng: marker.latLng.lng() }
      })

      infoWindow.addListener('domready', e => {
//        render(<InfoWindow />, document.getElementById('infoWindow'))
      })
      infoWindow.open(map)
    }



  render() {
    return (
      <div id='app-container' style={{ height: '100vh', width: '100vw' }}>
      <div id='map' style={{ height: '100%', width: '100%' }}/>
      </div>
    );
  }
}

export default Map
