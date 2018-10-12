import React, { Component } from 'react';
import MapContainer from'./MapContainer';
import '../App.css';

class MyMap extends Component {

  //initialize the state to display all locations by default
	state = {
		selectedMapLocations: this.props.myLocations,
		selectedListLocation: '',
		query: '',
	}

  //handles the filtering of the locations array
	onQueryEvent = (query) => {
		this.setState({query: query})
		if(query.length === 0)
			this.setState({selectedMapLocations: this.props.myLocations});
		else
			this.setState({selectedMapLocations: this.props.myLocations.filter(p => p.title.toLowerCase().includes(query.trim().toLowerCase()))})
	}

	render() {
		return(
			// renders the list part
			<div>
				<div className={'listcontainer'} >
				  <label className="filter" >
						<input className='filterlist'
							type="text"
							placeholder='Filter ...'
							onChange={event => this.onQueryEvent(event.target.value)}
							value={this.state.query}
							tabIndex='1'
							aria-label='Filter locations'
						/>
					</label>
					{this.state.selectedMapLocations.map((location, index) => (
						<div className='location'
							tabIndex={2+index}
							key={index}
							onClick={() => this.setState({selectedListLocation: location.title})}
						>
							<a>{location.title}</a>
						</div>
					))}
				</div>

        {//renders the map part
				}
				<div className='mapcontainer' tabIndex='-1' >
					<div className={'titlecontainer'} tabIndex='-1'>
						<h1 className={'title'} >Beautiful beaches near Tampa, FL</h1>
					</div>
					<div className={'pagecontainer'} tabIndex='-1' role='application' >
						<MapContainer tabIndex='-1'
							selectedMapLocations={this.state.selectedMapLocations}
							selectedListLocation={this.state.selectedListLocation}
							//function below provides a way to clear the location from the component state in order not to exceed maximum update depth allowed by React
							clearListLocation={(location) => {this.setState({selectedListLocation: location})}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default MyMap;
