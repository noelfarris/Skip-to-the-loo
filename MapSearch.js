var React = require('react-native');

var GooglePlacesAutocomplete = require('react-native-google-places-autocomplete').create({
  placeholder: 'Search',
  minLength: 2, // minimum length of text to search 
  autoFocus: false,
  fetchDetails: true,
  onPress(data, details = null) { // details is provided when fetchDetails = true 
    console.log(data);
    console.log(details);

    console.log(this);
  },
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
 
// var MapSearch = React.createClass({
//   render: function() {
//     return (
//       <GooglePlacesAutocomplete style={this.props.style} onPress={() => {console.log('onPress!!!')}} />
//     );
//   }
// });

module.exports = GooglePlacesAutocomplete;