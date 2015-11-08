//Component for reviewing places

var React = require('react-native');
var StarRating = require('./StarRating');
var Parse = require('parse/react-native');
var Button = require('react-native-button');
var ReviewModel = require('./ReviewModel');
var PlaceModel = require('./PlaceModel');
var BookList = require('./BookList');


var {
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
        <Text style={styles.header}>Add a Review</Text>
        <Text style={styles.textTop}>Cleanliness</Text>
        <StarRating ref="cleanliness" style={styles.container} />
        <Text style={styles.text}>Privacy</Text>
        <StarRating ref="privacy" style={styles.container} />
        <Text style={styles.text}>Overall</Text>
        <StarRating ref="overall" style={styles.container} />
        <Text style={styles.textTop}>Some Words</Text>
        <TextInput ref="reviewText"
          style={{marginRight: 10, marginLeft: 10, height: 80, fontSize: 13, textAlign: 'left', multiline: 'true', borderColor: 'gray', borderWidth: 1, padding: 10, }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={{backgroundColor: '#1F53A6', borderRadius: 10, color: 'white', padding: 5, margin: 10}}
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
    flex: 2,
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
  header: {
    marginTop: 75,
    fontSize: 25,
    padding: 10
  }
});


module.exports = Review;