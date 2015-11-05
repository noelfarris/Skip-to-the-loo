var React = require('react-native');
var StarRating = require('./StarRating');
var Parse = require('parse/react-native');
var Button = require('react-native-button');
var ReviewModel = require('./ReviewModel');
var PlaceModel = require('./PlaceModel');
var BookList = require('./BookList');
var Camera = require('./Camera');


var {
  Text,
  SwitchIOS,
  StyleSheet,
  TextInput,
  View,
  TextInput,
  AlertIOS
} = React;

var LocationDetails = React.createClass({
  getInitialState() {
    return {
      value: 0,
      trueSwitchIsOn: true,
      falseSwitchIsOn: false
    };
  },

//function to save review to parse
submitReview() {

    var placeID = this.props.newPlace.id;
    var targetPlaceModel = new PlaceModel({objectId: placeID})
    targetPlaceModel.set('Public', this.state.falseSwitchIsOn);
    targetPlaceModel.set('Open', this.refs.open.props.value);
    targetPlaceModel.set('Close', this.refs.close.props.value);
    targetPlaceModel.save();
    var newReview = new ReviewModel({
      cleanliness: parseInt(this.refs.cleanliness.state.rating)+1,
      privacy: parseInt(this.refs.privacy.state.rating)+1,
      overall: parseInt(this.refs.overall.state.rating)+1,
      text: this.refs.reviewText.props.value,
      placeID: targetPlaceModel
    })
    newReview.save();
    this.props.navigator.pop();
  },

  showPlaceDetail(targetPlaceModel) {
    this.props.navigator.push({
      component: Camera,
      passProps: {
        targetPlaceModel: targetPlaceModel
      }
    });
  },

  render(targetPlaceModel) {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Public - No/Yes</Text>
        <SwitchIOS
          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
          style={{marginBottom: 1, marginLeft: 10}}
          value={this.state.falseSwitchIsOn} />
        <Text style={styles.text}>Hours - Open</Text>
            <TextInput ref="open"
              style={styles.textInput}
              onChangeText={(text1) => this.setState({text1})}
              value={this.state.text1}
            />
            <Text style={styles.text}>Hours - Close</Text>
            <TextInput ref="close"
              style={styles.textInput}
              onChangeText={(text2) => this.setState({text2})}
              value={this.state.text2}
            />
        <Button style={{borderWidth: 1, borderColor: '#3D9AFF', padding: 5}} onPress={() => this.showPlaceDetail(targetPlaceModel)}>Add</Button>
        <StarRating ref="cleanliness" style={styles.container} />
        <Text style={styles.text}>Privacy</Text>
        <StarRating ref="privacy" style={styles.container} />
        <Text style={styles.text}>Overall</Text>
        <StarRating ref="overall" style={styles.container} />
        <Text style={styles.text}>Some Words</Text>
        <TextInput ref="reviewText"
          style={{height: 90, fontSize: 13, textAlign: 'left', multiline: 'true', borderColor: 'gray', borderWidth: 1, padding: 10, }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={{borderWidth: 1, borderColor: '#3D9AFF', padding: 5}}
          onPress={() => AlertIOS.alert(
            'Urine business',
            'Are you sure about submitting?',
            [
              {text: 'Yes', onPress: () => this.submitReview()},
              {text: 'Cancel', onPress: () => this.props.navigator.pop()},
            ]
          )}
          >
          Submit
        </Button>
      </View>
    );
  }
});

var styles = StyleSheet.create({
	container: {
    justifyContent: 'flex-start'
  },
  textInput: {
    width: 150,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    fontSize: 13,
    padding: 4,
    marginLeft: 10
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  textTop: {
        marginTop: 65,
        flex: 1,
        padding: 10,
        fontSize: 15,
        color: '#656565',
    },
    text: {
        padding: 10,
        fontSize: 15,
        color: '#656565',
        alignItems: 'center',
    },
});


module.exports = LocationDetails;