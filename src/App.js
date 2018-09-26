import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';


class App extends Component {


  render() {
      return (
        <Map

          id="myMap"
/*          options={{
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          }}
*/
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: { lat: 41.0082, lng: 28.9784 },
              map: map,
              title: 'Hello Istanbul!'
            });
          }}
        />
      );
    }
}
export default App;
