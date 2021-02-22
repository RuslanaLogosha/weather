/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { FlatList } from 'react-native';
import ForecastCard from './components/ForecastCard';
navigator.geolocation = require('@react-native-community/geolocation');


export default class App extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [],
			error:''
		};
	}

	componentDidMount(){
		this.getLocation();
	}

	getLocation(){

		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(
					(prevState) => ({
					latitude: position.coords.latitude, 
					longitude: position.coords.longitude
					}), () => { this.getWeather(); }
				);
			},
			(error) => this.setState({ forecast: error.message }),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
		);
	}

	getWeather(){

		let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=dab7ad6cda7eda06a0ffbfb19b484b00';

		fetch(url)
		.then(response => response.json())
		.then(data => {
			this.setState((prevState, props) => ({
				forecast: data
			}));
		})
	}

	render() {
		return (
			<FlatList data={this.state.forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
		);
	}
}