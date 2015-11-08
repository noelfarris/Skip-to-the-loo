var React = require('react-native');
var photo = require('./photo.png')

var {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} = React;
var Camera = require('react-native-camera');
 
var cameraApp = React.createClass({
  getInitialState() {
    return {
      cameraType: Camera.constants.Type.back
    }
  },


  render() {
    return (
      <Camera
        ref="cam"
        style={styles.container}
        onBarCodeRead={this._onBarCodeRead}
        type={this.state.cameraType}
      >
        <TouchableHighlight onPress={this._switchCamera}>
          <Text>The old switcheroo</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._takePicture}>
          <Image source={photo} />
        </TouchableHighlight>
      </Camera>
    );
  },
  savePhoto() {
  var placeID = this.props.targetPlaceModel.id;
  var newTargetPlaceModel = new PlaceModel({objectId: placeID});
  newTargetPlaceModel.set('photo', data);
  newTargetPlaceModel.save();
},
  _onBarCodeRead(e) {
    console.log(e);
  },
  _switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back
      ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  },
  _takePicture() {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
      savePhoto(data);
      });
  }
});
 
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});

module.exports = cameraApp;