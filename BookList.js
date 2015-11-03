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
	 }

	 showPlaceDetail(place) {
				this.props.navigator.push({
						title: place.get('title'),
						component: PlaceDetail,
						passProps: {place: place}
			 });
	 }

		render() {
				if (this.state.isLoading) {
						return this.renderLoadingView();
				}

				return (
						<ListView
								dataSource={this.state.dataSource}
								renderRow={this.renderPlace.bind(this)}
								style={styles.listView}
								/>
				);
		}

		renderLoadingView() {
		return (
				<View style={styles.loading}>
						<ActivityIndicatorIOS
								size='large'/>
						<Text>
								Flushing...
						</Text>
				</View>
				);
		}

		renderPlace(place) { 
		console.log(place);
			 return (
						<TouchableHighlight onPress={() => this.showPlaceDetail(place)}  underlayColor='#dddddd'>

								<View>
										<View style={styles.container}>
												<Image
														source={{uri: place.get("imageLinks")}}
														style={styles.thumbnail} />
												<View style={styles.rightContainer}>
														<Text style={styles.title}>{place.get("title")}</Text>
														<Text style={styles.rating}>{place.get("rating")} loo rolls</Text>
														<Text style={styles.address}>{place.get("address")}</Text>
												</View>
										</View>
										<View style={styles.separator} />
								</View>
						</TouchableHighlight>
				);
		}
};
 
module.exports = PlaceList;