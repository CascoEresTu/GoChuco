import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'

class MapContainer extends Component {
  render() {
    return (
    <div style={{ height: '20', width: '10%' }}>  
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <InfoWindow onClose={this.onInfoWindowClose}>
            
        </InfoWindow>
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBBMSCIDN-SZmFUZWeADaNLqIneJsHhRdY')
})(MapContainer)