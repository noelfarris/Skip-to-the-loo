//Component used to add an annotation to the map as a location in the location model.

'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var PlaceModel = require('./PlaceModel');
var PlaceDetail = require('./PlaceDetail');
var Button = require('react-native-button');
var PlaceModel = require('./PlaceModel');
var LocationDetails = require('./LocationDetails')


var {
  MapView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  Image
} = React;

var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var MapRegionInput = React.createClass({

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

var MapPlaces = React.createClass({

  getInitialState() {
    return {
      mapRegion: null,
      mapRegionInput: null,
      locations: [],
      annotations: null,
      isFirstLoad: true,
    };
  },

  componentWillMount() {
        this.GooglePlacesAutocomplete = require('react-native-google-places-autocomplete').create({
          placeholder: 'Search',
          minLength: 2, // minimum length of text to search 
          autoFocus: false,
          fetchDetails: true,
          onPress: this._onSearchComplete,
          getDefaultValue() {
            return ''; // text input default value 
          },
          query: {
            // available options: https://developers.google.com/places/web-service/autocomplete 
            key: 'AIzaSyBQHyofGNKblmccRnELYtzoR2ZHi3AfWQA',
            language: 'en', // language of the results 
            types: '(cities)', // default: 'geocode' 
          },
          styles: {
            description: {
              fontWeight: 'bold',
            },
          }
        });  
    },

  addPlace() {
    console.log(this.state.mapRegionInput);
    var newPlace = new PlaceModel({
      title: this.refs.locationName.props.value,
      address: this.refs.address.props.value,
      location: new Parse.GeoPoint(this.state.mapRegionInput.latitude, this.state.mapRegionInput.longitude)
    })
    newPlace.save().then(() => {
      console.log(this.props)
      this.props.navigator.push({
            title: newPlace.get('title'),
            component: LocationDetails,
            passProps: {
              newPlace: newPlace
            }
          })
        }) 
  },

  

    render() {
      console.log(this.state.mapRegionInput);
      var annotations = this.state.annotations || [];
      if(this.state.mapRegionInput){
        annotations = annotations.slice(0);
        annotations.push({
          longitude: this.state.mapRegionInput.longitude,
          latitude: this.state.mapRegionInput.latitude,
          title: 'Center Pin'
        })
      }
      console.log(annotations);
        var MapSearch = this.GooglePlacesAutocomplete;
        return (
            <View style={styles.view}>
            <MapSearch />
            <MapView
                style={styles.map}
                onRegionChange={this._onRegionChange}
                onRegionChangeComplete={this._onRegionChangeComplete}
                region={this.state.mapRegion || undefined}
                annotations={annotations || undefined}
                showsUserLocation={true}
            />
            <Text>Drag map to place pin over location</Text>
            <Text>Name</Text>
            <TextInput ref="locationName"
              style={styles.textInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Text>Address</Text>
            <TextInput ref="address"
              style={styles.textInput}
              onChangeText={(text2) => this.setState({text2})}
              value={this.state.text2}
            />
            <Button
              style={{borderWidth: 1, borderColor: '#3D9AFF', padding: 5, marginLeft: 10}}
              onPress={() => this.addPlace()}>
              Next
            </Button>
            <Image style={styles.centerPin} source={{uri: 'http://icon-park.com/imagefiles/location_map_pin_orange5.png'}} />
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
      title: 'You are here',
    }];
  },

  _onRegionChange(region) {
    // console.log(region);
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

  _onSearchComplete(data, details=null) {
    console.log(data, details);
    console.log('onSearchComplete');
    this.setState({
      mapRegion: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      }
  })
}

});

var styles = StyleSheet.create({
    view: {
        paddingTop: 65,
    },
  map: {
    height: 380,
    marginTop: -33
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
  centerPin: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50
  },
  changeButton: {
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  },
});

module.exports = MapPlaces;

// exports.displayName = (undefined: ?string);
// exports.title = '<MapView>';
// exports.description = 'Base component to display maps';
// exports.examples = [
//   {
//     title: 'Map',
//     render(): ReactElement { return <MapViewExample />; }
//   },
//   {
//     title: 'Map shows user location',
//     render() {
//       return  <MapView style={styles.map} showsUserLocation={true} />;
//     }
//   }
// ];