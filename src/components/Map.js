import React, { Component } from 'react';
import '../App.css';

class Map extends Component {

//initialize the state to show all locations
  state = {
    selectedLocations: this.props.myLocations,
    query: '',
  }

//lifecycle event to load (asyncronously) the Google Maps JS API (only once)
  componentDidMount() {
    if (!window.google) {
      //load Google Maps JS API, when finished, call initMap()
      var scrpt = document.createElement('script');
      scrpt.type = 'text/javascript';
      scrpt.src = `https://maps.google.com/maps/api/js?key=AIzaSyAt9UrH46XScWw9mlJrgHK69emSizD-Q2s`;
      var first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(scrpt, first);
      scrpt.addEventListener('load', e => {
        this.initMap()
      })
    } else {
      //if already loaded, call initMap()
      this.initMap()
    }
  }



  initMap() {
    var map;
    map = new window.google.maps.Map(
      document.getElementById('map'), {

        center: {lat: 40.7413549, lng: -73.9980244},
        zoom: 13
      });

    var markers = [];
    for (var i = 0; i < this.state.selectedLocations.length; i++) {
      var position = this.state.selectedLocations[i].location;
      var title = this.state.selectedLocations[i].title;
      var marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i
      });
      markers.push(marker);
    }
  }


  filterLocations = (query) => {
  		this.setState({query: query});
  		this.filter(query);
  	}

    filter = (thisQuery) => {
    		if(thisQuery.length === 0)
    			this.setState({selectedLocations: this.props.myLocations}, this.initMap());
    		else
    			this.setState({selectedLocations:
    				this.props.myLocations.filter(p => p.title.toLowerCase().includes(thisQuery.trim().toLowerCase()))}, this.initMap())
    	}


  render() {
    return (
      <div id='app-container' style={{ height: '100vh', width: '100vw' }}>
        <div id='map' style={{ height: '100%', width: '100%' }}/>

        <div id='list-container' >
          <input id='input' type='text' placeholder='Search...' onKeyUp={event => this.filterLocations(event.target.value)} />
          {this.state.selectedLocations.map((place, index) => (
          <div className='locationDiv' key={index}>
            <a>{place.title}</a>
          </div>
          ))}
        </div>
      </div>

    );
  }
}

export default Map
