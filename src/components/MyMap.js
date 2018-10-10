import React, { Component } from 'react';
//import PropTypes from "prop-types";
import Mapcontainer from'./Mapcontainer';
//import Hamburger from'./Hamburger';
//import foursquare from "../images/foursquare.png";

import './css/Sidebar.css';
import './css/Input.css';

/**
*Component that fits all UI's together
**/
class MyMap extends Component {





	state = {
		//sideNavStyle: '0',
		//hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
		selectedMapLocations: this.props.myLocations,
		query: '',
		selectedListLocation: '',
		//hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
		//inputTabIndex: -12,
	}

	//Toggles hamburger menu item between open and close
	// hamburgerToggle = () => {
	// 	if(this.state.hamburgerClassName === 'hamburger hamburger--minus js-hamburger')
	// 		this.setState({
	// 			//sideNavStyle: '270px',
	// 			hamburgerClassName: 'hamburger hamburger--minus is-active',
	// 			hamburgerArialabel: 'Hamburger Menu open. Click to Close',
	// 			//inputTabIndex: 3
	// 		})
	// 	else
	// 		this.setState({
	// 			//sideNavStyle: '0',
	// 			hamburgerClassName: 'hamburger hamburger--minus js-hamburger',
	// 			hamburgerArialabel: 'Hamburger Menu closed. Click to Open',
	// 			//inputTabIndex: -12
	// 		})
	// }
	//Query search bar input and reset list item selected
	handleQueryEvent = (query) => {
		this.setState({query: query})
		this.search(query);
	}

	//Method called from handleQueryEvent
	search = (thisQuery) => {
		//If no input query, do not filter results. Display all places.
		if(thisQuery.length === 0)
			this.setState({selectedMapLocations: this.props.myLocations});
		else
			//Filter input query on the list items and maps places.
			this.setState({selectedMapLocations:
				this.props.myLocations.filter(p => p.title.toLowerCase().includes(thisQuery.trim().toLowerCase()))})
	}

	//Display all place markers by default
	// componentDidMount() {
	// 	this.setState({selectedMapLocations: this.props.myLocations})
	// }

	//Hamburger menu navigtion
	// onclickOrTouch=() => {
	// 	this.setState({
	// 		//sideNavStyle:'0',
	// 		 //hamburgerClassName:'hamburger hamburger--minus js-hamburger',
	// 		 //hamburgerArialabel:'Hamburger Menu closed. Click to Open',
	// 		 //inputTabIndex:-12
	// 	})
	// }
	render() {
		return(
			<div>
				<div
					id={'mySidenav'}
					className={'sidenav'}
//					style={{width:this.state.sideNavStyle}}
            style={{width: '30%'}}
				>
				  <label className="inp" >

						<input
							type="text"
							id="inp"
							placeholder='Filter ...'
							onChange={event => this.handleQueryEvent(event.target.value)}
							value={this.state.query}
							aria-label='Filter places search bar'
							//tabIndex={this.state.inputTabIndex}
							className='searchbar'
						/>
						{//<span className="label">Filter by name</span>
					  // 	<svg width="120px" height="26px" viewBox="0 0 120 26">
					  //   	<path d="M0,25 C21,25 46,25 74,25 C102,25 118,25 120,25"></path>
					  // 	</svg>
					  // <span className="border"></span>
					}
					</label>

					{this.state.selectedMapLocations.map((place, index) => (
						<div
							className='placediv'
							//tabIndex={this.state.inputTabIndex+index}
							key={index}
							onClick={() => this.setState({selectedListLocation: place.title})}
						>
							<a>{place.title}</a>
						</div>
					))}

				</div>
				<div
					id='main'
					style={{marginLeft: '0'}}
					 >
					<div className={'top-section'} >
{//						<Hamburger

							//hamburgerArialabel={this.state.hamburgerArialabel}
							//hamburgerClassName={this.state.hamburgerClassName}
							//hamburgerToggle = {this.hamburgerToggle}
//						/>
}
						<h1 className={'mainheading'} >My locations title</h1>
					</div>
					<div
						className={'map-area'}
						//onClick={this.onclickOrTouch}
						//onTouchMove={this.onclickOrTouch}
						role='application'
						aria-label='Google Maps Internal Window'
					>
						<Mapcontainer
							selectedMapLocations={this.state.selectedMapLocations}
							selectedListLocation={this.state.selectedListLocation}
							//provide a way to clear location from state in order not to exceed maximum update depth allowed by React
							clearListLocation={(place) => {this.setState({selectedListLocation: place})}}
						/>
					</div>
				</div>
			</div>
		)
	}
}

// Map.propTypes = {
//   myLocations: PropTypes.array.isRequired,
// }

export default MyMap;
