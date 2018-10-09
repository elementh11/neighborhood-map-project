import React, { Component } from 'react';
import MyMap from"./components/MyMap";

/*Passes all places into the map as props.*/

class App extends Component {

 state ={
  locations:[
           {title: "Expedition Everest", location: {lat: 28.359373, lng: -81.586706}},
           {title: "Hollywood Rip Ride", location: {lat: 28.4749791, lng: -81.468223}},
           {title: "Universal's Islands of Adventure", location: {lat: 28.471140, lng: -81.471570}},
           {title: "Rock 'N' Roller Coaster", location: {lat: 28.359724, lng: -81.561841}},
           {title: "Sea World Mako Rollercoaster", location: {lat: 28.411360, lng: -81.463770}},
           {title: "Space Mountain", location: {lat: 28.419151, lng: -81.577250}}
        ]
 }
  render(){
    return(
      <MyMap myLocations={this.state.locations} />
    )
  }
}

export default App;
