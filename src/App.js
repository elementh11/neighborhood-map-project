import React, { Component } from 'react';
import MyMap from"./components/MyMap";

/*Passes all places into the map as props.*/

class App extends Component {

 state ={
  locations:[
    {title: 'Dunedin Marina', location: {lat: 28.0116851, lng: -82.7937135}},
    {title: 'Treasure Island Beach', location: {lat: 27.766509, lng: -82.769387}},
    {title: 'Crystal Beach', location: {lat: 28.0914044, lng: -82.7798243}},
    {title: 'Sand Key Park', location: {lat: 27.959113, lng: -82.827708}},
    {title: 'Bean Point', location: {lat: 27.5380915, lng: -82.7459336}},
    {title: 'Pier 60', location: {lat: 27.9766, lng: -82.8286}},
  ]
 }
  render(){
    return(
      <MyMap myLocations={this.state.locations} />
    )
  }
}

export default App;
