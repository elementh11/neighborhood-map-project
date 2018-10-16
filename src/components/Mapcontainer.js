import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as Foursquare from '../SquareAPI.js';

window.gm_authFailure = ()=>{alert("Cannot load Google Maps API. Please check your Google API key")}

//renders the map using google-maps-react library
//with help and inspiration from https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react

class MapContainer extends Component {

  state = {
    showInfoWindow: false,
    activeMarker: {},
    rating: '',
    photo: '',
    bounds: {},
  }

  //set the bounds to include markers
  componentDidMount(){
    let bounds = new this.props.google.maps.LatLngBounds();
    this.props.selectedMapLocations.map(x => bounds.extend(x.location));
    this.setState({bounds})
  }

  //handles click on marker: open infowindow and get venue details
  onMarkerClick = (markerProperties, markerReference) => {
    this.setState({
      activeMarker: markerReference,
      showInfoWindow: true,
    });
    this.getVenues(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }

  //handles click on list by using the combination of getSnapshotBeforeUpdate and componentDidMount lifecycles
  getSnapshotBeforeUpdate(){
    if(this.props.selectedListLocation !== '') {
      this.setState({
        activeMarker:this.refs[this.props.selectedListLocation].marker,
        showInfoWindow: true,
        });
        this.getVenues(
          this.refs[this.props.selectedListLocation].props.position.lat,
          this.refs[this.props.selectedListLocation].props.position.lng,
          this.refs[this.props.selectedListLocation].props.title
        )
        //clear location in order not to exceed maximum update depth allowed by React
        //caused by the component repeatedly calling setState inside componentDidUpdate
        this.props.clearListLocation('')
    }
    return null;
  }

  componentDidUpdate(){
    return null;
  }

  //get venue details from Foursquare: (best) photo and ratings
  getVenues = (lat,lng,name) => {
    return Foursquare.searchID(lat, lng, name).then(venueId => {
      if(venueId ==='error')
        this.setState({
            rating: 'n/a',
            photo: 'error'
        });
       else {
        Foursquare.getVenueDetails(venueId).then(response => {
          if(response === 'error' || response.meta.code !== 200)
            this.setState({rating: 'n/a', photo: 'error'});
          else{
            if('bestPhoto' in response.response.venue)
             this.setState({photo: response.response.venue.bestPhoto.prefix+'180'+response.response.venue.bestPhoto.suffix});
            else
              this.setState({photo:'error'});
            if('rating' in response.response.venue)
              this.setState({rating: response.response.venue.rating});
            else
              this.setState({rating: 'n/a', photo: 'error'});
          }
        })
      }
    })
  }

  //render map, markers, infowindows with google-maps-react
  render(){
    return (
      <Map
        google={this.props.google}
        onClick={() => {this.setState({activeMarker: {},showInfoWindow: false})}}
        bounds={this.state.bounds}
        ref={'map'}
      >
        {this.props.selectedMapLocations.map((markerInfo, index) =>
          <Marker
              ref={markerInfo.title}
              position={{lat: markerInfo.location.lat, lng: markerInfo.location.lng}}
              key={index}
              title={markerInfo.title}
              onClick={this.onMarkerClick}
              animation={this.state.activeMarker.title === markerInfo.title ? this.props.google.maps.Animation.BOUNCE : null  }
              icon={{ url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png', scaledSize: new this.props.google.maps.Size(25, 35)}}
          />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={() => this.setState({ showInfoWindow: false})}
          visible={this.state.showInfoWindow} >
            <div className="infowindowcontent" aria-label={`InfoWindow on ${this.state.activeMarker.title}`} >
              <h2 tabIndex="0" style={{textAlign:'center'}}>{this.state.activeMarker.title}</h2>
              {this.state.photo ==='error' ?
                <div>
                  <h3  tabIndex="0" style={{textAlign:'center'}}>Cannot find venue details</h3>
                </div> :
                <div>
                  <div style={{textAlign:'center'}}>
                    <img tabIndex="0" src={this.state.photo} alt={this.state.activeMarker.title}/>
                  </div>
                  <h3 tabIndex='-1' style={{textAlign:'center'}}>Rating:{' '}{this.state.rating}/10<sup>*</sup></h3>
                  <h6 tabIndex='-1' style={{textAlign:'center'}}><sup>*</sup>data from Foursquare.com</h6>
                </div>
              }
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey:'AIzaSyAt9UrH46XScWw9mlJrgHK69emSizD-Q2s'
})(MapContainer)
