'use strict';

var Parse = require('parse/react-native');
var ParseReact = require('parse-react');
var React = require('react-native');
var PlaceDetail = require('./PlaceDetail');

var {
	Image,
	StyleSheet,
	Text,
	View,
	Component,
	ListView,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		padding: 10
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	thumbnail: {
		width: 53,
		height: 70,
		marginRight: 10
	},
	rightContainer: {
		flex: 1,
	},
	title: {
		fontSize: 15,
	},
	address: {
		color: '#656565',
		fontSize: 12
	},
	rating: {
		color: '#FBBC05',
		marginBottom: 1,
		fontSize: 12,
		marginBottom: 10
	},
	listView: {
		backgroundColor: '#F5FCFF'
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

class PlaceList extends Component {
	// mixins: [ParseReact.Mixin]
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})
		};
	}

	getInitialState() {
		return {
			initialPosition: 'unknown',
			lastPosition: 'unknown',
		};
	}

	componentDidMount() {
		var query = new Parse.Query('Place');
		query.find()
			.then((results) => {
				console.log('FINISHED GRABBING RESULTS');
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(results),
					isLoading: false
				});
			})
		navigator.geolocation.getCurrentPosition(
			(initialPosition) => this.setState({
				initialPosition
			}), (error) => alert(error.message), {
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			}
		);
		this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
			this.setState({
				lastPosition
			});
		});
		
		
	}

	showPlaceDetail(place) {
		this.props.navigator.push({
			title: place.get('title'),
			component: PlaceDetail,
			passProps: {
				place: place
			}
		});
	}
	render() {
		// console.log(this.state.lastPosition);
		if (this.state.isLoading) {
			return this.renderLoadingView();
		}

		return ( 
			<ListView dataSource = {this.state.dataSource} 
				renderRow = {this.renderPlace.bind(this)}
				style = {styles.listView}
			/>
		);
	}

	renderLoadingView() {
		return ( 
			<View style = {styles.loading}>
				<ActivityIndicatorIOS size = 'large' / >
				<Text>Flushing...</Text> 
			</View>
		);
	}

	renderPlace(place) {

		function distance(lon1, lat1, lon2, lat2) {
    		var R = 6371; // Radius of the earth in km
    		var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
    		var dLon = (lon2 - lon1).toRad();
    		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        		Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        		Math.sin(dLon / 2) * Math.sin(dLon / 2);
    		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    		var d = R * c; // Distance in km
    		return d* 0.62137;
		};
		/** Converts numeric degrees to radians */
		if (typeof(Number.prototype.toRad) === "undefined") {
    		Number.prototype.toRad = function() {
        		return this * Math.PI / 180;
    		}
		}
		var getDistance = () => {
			if(this.state.lastPosition) {
    		console.log(this.state.lastPosition);
    		return distance(this.state.lastPosition.coords.longitude, this.state.lastPosition.coords.latitude, place.get('location').longitude, place.get('location').latitude);
			}
		};
		var yourDistance = getDistance();
		console.log(yourDistance);
		return ( 
			<TouchableHighlight onPress = {() => this.showPlaceDetail(place)}
			underlayColor = '#dddddd'>
				<View>
					<View style = {styles.container}>
						<Image source = {{uri: place.get("imageLinks")}} style = {styles.thumbnail}/> 
						<View style ={styles.rightContainer}>
						<Text style ={styles.title}>{place.get("title")}</Text> 
						<Text style ={styles.rating}>{place.get("rating")} loo rolls</Text>
						<Text style={styles.address}>{yourDistance.toFixed(2)} miles</Text>
						<Text style ={styles.address}>{place.get("address")}</Text> 
					</View> 
				</View> 
				<View style ={styles.separator}/> 
				</View> 
			</TouchableHighlight>
		);
	}
};

module.exports = PlaceList;
