import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
//import PropTypes from "prop-types";
//import MapStyleOptions from './json/MapStyleOptions.json';
import * as fourSquareAPI from './APIs/fourSquareAPI.js';

/**
*Google Maps Container implemented with google-maps-react library
// inspiration from https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
*/

class Mapcontainer extends Component {

  state = {
    bounds: {},
    showInfoWindow: false,
    rating: '',
    photo: '',
    activeMarker: {}
  }

//Used to open the infoWindow and load FourSquare info
  onMarkerClick = (markerProperties, markerReference) =>{
    this.setState({
      activeMarker: markerReference,
      showInfoWindow: true,
      rating: 'Loading rating',
      photo: 'Loading photo'
    });
    this.getVenues(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }

  //Get FourSquare API info and error handling
  getVenues = (lat,lng,name) => {
    return fourSquareAPI.getSearchResult(lat, lng, name).then(venueId => {
      if(venueId ==='error' )
        this.setState({
            rating: 'Error loading Content',
            photo: 'error'
        });
       else {
        fourSquareAPI.getDetails(venueId).then(response => {
          if(response === 'error' || response.meta.code !== 200)
            this.setState({
              rating: 'Error loading content',
              photo: 'error'
            });
          else{
            if('rating' in response.response.venue)
              this.setState({rating: response.response.venue.rating});
            else
              this.setState({rating: 'Error loading content'});
            if('bestPhoto' in response.response.venue)
             this.setState({photo: response.response.venue.bestPhoto.prefix+'150'+response.response.venue.bestPhoto.suffix});
            else
              this.setState({photo:'error'});
          }
        })
      }
    })
  }

//Bounds set to display all markers within the google maps container upon mounting componenent
  // setBounds = () => {
  //   let bounds = new this.props.google.maps.LatLngBounds();
  //   this.props.selectedMapLocations.map(x => bounds.extend(x.location));
  //   // for (let i = 0; i < this.props.selectedMapLocations.length; i++)
  //   //     bounds.extend(this.props.selectedMapLocations[i].location);
  //   //this.setState({bounds})
  // }
  //
  // componentDidMount(){
  //  this.setBounds();
  // }

componentDidMount(){
  let bounds = new this.props.google.maps.LatLngBounds();
  this.props.selectedMapLocations.map(x => bounds.extend(x.location));
  this.setState({bounds})
}


//Open corresponding marker when a place on the side list is selected
  getSnapshotBeforeUpdate(){
      if(this.props.selectedListLocation !== ''){
      this.setState({
        activeMarker:this.refs[this.props.selectedListLocation].marker,
         showInfoWindow: true,
         rating:'Loading rating',
         photo:'Loading photo'
      });

      this.getVenues(
        this.refs[this.props.selectedListLocation].props.position.lat,
        this.refs[this.props.selectedListLocation].props.position.lng,
        this.refs[this.props.selectedListLocation].props.title
      )
      //clear location in order not to exceed maximum update depth allowed by React
       this.props.clearListLocation('')
    }
    return null;
  }

  componentDidUpdate(){
    return null;
  }

render(){
    return (

      <Map
        google={this.props.google}
        onClick={() => {this.setState({activeMarker: {},showInfoWindow: false})}}
        bounds={this.state.bounds}
        ref={'map'}
        // style={{width:this.props.mapWidth}}
        // center={this.state.center}
      >
        {this.props.selectedMapLocations.map((markerInfo, index) =>
          <Marker
              ref={markerInfo.title}
              position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
              key={index}
              title={markerInfo.title}
              onClick={this.onMarkerClick}
              // onMouseout={this.mouseMoveOutOfMarker}
              // onMouseover={this.onMouseoverMarker}
              animation={this.state.activeMarker.title === markerInfo.title ? this.props.google.maps.Animation.BOUNCE : null  }
              icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', scaledSize: new this.props.google.maps.Size(20, 32)}}
           />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={() => this.setState({ showInfoWindow: false})}
          visible={this.state.showInfoWindow} >
            <div
              className="info-window-content"
              aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
             >
              <h2 tabIndex="0" style={{textAlign:'center'}}>
               {this.state.activeMarker.title}
              </h2>
              {this.state.photo ==='Loading photo' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Loading photo</h3> :
                this.state.photo ==='error' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                <div style={{textAlign:'center'}}>
                  <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                </div>}
              <h3 tabIndex="0"  style={{textAlign:'center'}}>Rating:{' '}{this.state.rating}<sup>*</sup></h3>
              <h6 tabIndex="0"  style={{textAlign:'center'}}><sup>*</sup>data from Foursquare.com</h6>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default  GoogleApiWrapper({
  apiKey:'AIzaSyAt9UrH46XScWw9mlJrgHK69emSizD-Q2s'
})(Mapcontainer)

// Mapcontainer.propTypes = {
//   selectedMapLocations: PropTypes.array.isRequired,
//   selectedListLocation: PropTypes.string.isRequired,
//   clearListLocation: PropTypes.func.isRequired
// }
