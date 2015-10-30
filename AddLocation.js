'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var PlaceModel = require('./PlaceModel');
var PlaceDetail = require('./PlaceDetail');

var {
  MapView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var MapRegionInput = React.createClass({

  propTypes: {
    region: React.PropTypes.shape({
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
      latitudeDelta: React.PropTypes.number.isRequired,
      longitudeDelta: React.PropTypes.number.isRequired,
    }),
    onChange: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      region: nextProps.region || this.getInitialState().region
    });
  },

  render: function() {
    var region = this.state.region || this.getInitialState().region;
    return (
      <View>
        <View style={styles.row}>
          <Text>
            {'Latitude'}
          </Text>
          <TextInput
            value={'' + region.latitude}
            style={styles.textInput}
            onChange={this._onChangeLatitude}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude'}
          </Text>
          <TextInput
            value={'' + region.longitude}
            style={styles.textInput}
            onChange={this._onChangeLongitude}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Latitude delta'}
          </Text>
          <TextInput
            value={'' + region.latitudeDelta}
            style={styles.textInput}
            onChange={this._onChangeLatitudeDelta}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.row}>
          <Text>
            {'Longitude delta'}
          </Text>
          <TextInput
            value={'' + region.longitudeDelta}
            style={styles.textInput}
            onChange={this._onChangeLongitudeDelta}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.changeButton}>
          <Text onPress={this._change}>
            {'Change'}
          </Text>
        </View>
      </View>
    );
  },

  _onChangeLatitude: function(e) {
    regionText.latitude = e.nativeEvent.text;
  },

  _onChangeLongitude: function(e) {
    regionText.longitude = e.nativeEvent.text;
  },

  _onChangeLatitudeDelta: function(e) {
    regionText.latitudeDelta = e.nativeEvent.text;
  },

  _onChangeLongitudeDelta: function(e) {
    regionText.longitudeDelta = e.nativeEvent.text;
  },

  _change: function() {
    this.setState({
      latitude: parseFloat(regionText.latitude),
      longitude: parseFloat(regionText.longitude),
      latitudeDelta: parseFloat(regionText.latitudeDelta),
      longitudeDelta: parseFloat(regionText.longitudeDelta),
    });
    this.props.onChange(this.state.region);
  },
});
var AddPlace = React.createClass({

  getInitialState() {
    return {
      mapRegion: null,
      mapRegionInput: null,
      locations: [],
      annotations: null,
      isFirstLoad: true,
    };
  },

  // componentWillMount() {
  //       var query = new Parse.Query('Place');
  //         query.find().then(
  //           (locations) => {
  //               console.log(locations);
  //               var places = locations.map((place) => {
  //                   console.log(place);
  //                   return {
  //                           latitude: place.get('location').latitude, 
  //                           longitude: place.get('location').longitude,
  //                           title: place.get('title'),
  //                           subtitle: (place.get('rating')).toString() + ' Luu Rolls',
  //                           hasRightCallout: true,
  //                           onRightCalloutPress: (() => {
  //                                                               this.props.navigator.push({
  //                                                                   title: place.get('title'),
  //                                                                   component: PlaceDetail,
  //                                                                   passProps: {place: place}
  //                                                               })
  //                                                           })
  //                       };
  //               });
  //               //this.setState({annotations: placeLatlng});
  //               this.setState({locations: places});
  //           },
  //           (err) => {
  //               console.log(err);
  //           }
  //           );
  //   },

    render() {
        return (
            <View>
            <MapView
                style={styles.map}
                onRegionChange={this._onRegionChange}
                onRegionChangeComplete={this._onRegionChangeComplete}
                region={this.state.mapRegion || undefined}
                annotations={this.state.annotations || undefined}
                showsUserLocation={true}
            />
            <MapRegionInput
                onChange={this._onRegionInputChanged}
                region={this.state.mapRegionInput || undefined}
            />
            </View>
        );
    },

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'Places',
    }];
  },

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  },

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  },

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  },

});

var styles = StyleSheet.create({
  map: {
    height: 450,
    marginTop: 65,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

module.exports = AddPlace;