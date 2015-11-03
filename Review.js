//Component for reviewing places

var React = require('react-native');
var StarRating = require('./StarRating');
var Parse = require('parse/react-native');
var Button = require('react-native-button');
var ReviewModel = require('./ReviewModel');
var PlaceModel = require('./PlaceModel');
var BookList = require('./BookList');


var {
  SliderIOS,
  Text,
  StyleSheet,
  View,
  TextInput,
  AlertIOS
} = React;

var Review = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },

//function to save review to parse
submitReview() {
    var placeID = this.props.place.id;
    var targetPlaceModel = new PlaceModel({objectId: placeID})
    var newReview = new ReviewModel({
      cleanliness: parseInt(this.refs.cleanliness.state.rating)+1,
      privacy: parseInt(this.refs.privacy.state.rating)+1,
      overall: parseInt(this.refs.overall.state.rating)+1,
      text: this.refs.reviewText.props.value,
      placeID: targetPlaceModel
    })
    console.log(this.props.place.id);
    console.log(newReview.get('placeID'));
    newReview.save();
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Cleanliness</Text>
        <StarRating ref="cleanliness" style={styles.container} />
        <Text style={styles.text}>Privacy</Text>
        <StarRating ref="privacy" style={styles.container} />
        <Text style={styles.text}>Overall</Text>
        <StarRating ref="overall" style={styles.container} />
        <Text style={styles.textTop}>Some Words</Text>
        <TextInput ref="reviewText"
          style={{height: 160, borderColor: 'gray', borderTopWidth: 1, padding: 10, }}
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
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  textTop: {
        flex: 1,
        marginTop: 75,
        padding: 10,
        fontSize: 15,
        color: '#656565',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        padding: 10,
        fontSize: 15,
        color: '#656565',
        alignItems: 'center',
    },
});


module.exports = Review;