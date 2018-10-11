import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as Foursquare from '../SquareAPI.js';

/**
* Google Maps Container implemented with google-maps-react library
* inspiration from https://scotch.io/tutorials/react-apps-with-the-google-maps-api-and-google-maps-react
*/

class MapContainer extends Component {

  state = {
    showInfoWindow: false,
    activeMarker: {},
    rating: '',
    photo: '',
    bounds: {},
  }

  componentDidMount(){
    let bounds = new this.props.google.maps.LatLngBounds();
    this.props.selectedMapLocations.map(x => bounds.extend(x.location));
    this.setState({bounds})
  }

//Used to open the infoWindow and load FourSquare info
  onMarkerClick = (markerProperties, markerReference) =>{
    this.setState({
      activeMarker: markerReference,
      showInfoWindow: true,
//      rating: 'Loading rating',
//      photo: 'Loading photo'
    });
    this.getVenues(markerProperties.position.lat, markerProperties.position.lng,markerProperties.title)
  }

  //Open corresponding marker when a place on the side list is selected
    getSnapshotBeforeUpdate(){
        if(this.props.selectedListLocation !== ''){
        this.setState({
          activeMarker:this.refs[this.props.selectedListLocation].marker,
           showInfoWindow: true,
//           rating:'Loading rating',
//           photo:'Loading photo'
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


  //Get FourSquare API info and error handling
  getVenues = (lat,lng,name) => {
    return Foursquare.getSearchResult(lat, lng, name).then(venueId => {
      if(venueId ==='error' )
        this.setState({
            rating: 'n/a',
            photo: 'error'
        });
       else {
        Foursquare.getDetails(venueId).then(response => {
          if(response === 'error' || response.meta.code !== 200)
            this.setState({
              rating: 'n/a',
              photo: 'error'
            });
          else{
            if('rating' in response.response.venue)
              this.setState({rating: response.response.venue.rating});
            else
              this.setState({rating: 'n/a'});
            if('bestPhoto' in response.response.venue)
             this.setState({photo: response.response.venue.bestPhoto.prefix+'180'+response.response.venue.bestPhoto.suffix});
            else
              this.setState({photo:'error'});
          }
        })
      }
    })
  }




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
            <div
              className="infowindowcontent"
              aria-label={`InfoWindow on ${this.state.activeMarker.title}`}
             >
              <h2 tabIndex="0" style={{textAlign:'center'}}>
               {this.state.activeMarker.title}
              </h2>
              {this.state.photo ==='error' ?
                <h3  tabIndex="0" style={{textAlign:'center'}}>error loading photo</h3> :
                // this.state.photo ==='error' ?
                // <h3  tabIndex="0" style={{textAlign:'center'}}>Photo could not load</h3> :
                <div style={{textAlign:'center'}}>
                  <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                </div>}

              <h3 tabIndex='-1'  style={{textAlign:'center'}}>Rating:{' '}{this.state.rating}/10<sup>*</sup></h3>
              <h6 tabIndex='-1'  style={{textAlign:'center'}}><sup>*</sup>data from Foursquare.com</h6>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default  GoogleApiWrapper({
  apiKey:'AIzaSyAt9UrH46XScWw9mlJrgHK69emSizD-Q2s'
})(MapContainer)
