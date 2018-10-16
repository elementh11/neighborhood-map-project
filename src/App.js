import React, { Component } from 'react';
import MyMap from './components/MyMap';
//use ErrorBoundary script from https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
import ErrorBoundary from './components/ErrorBoundary'


class App extends Component {

 //hardcoded initial array of locations
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
      <ErrorBoundary>
        <MyMap myLocations={this.state.locations} />
      </ErrorBoundary>
    )
  }
}

export default App;
