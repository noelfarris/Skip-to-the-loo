var React = require('react-native');
var _ = require('lodash');

var {
  StyleSheet,
  Text,
  View,
  Image
} = React;

var StarRating = React.createClass({

  propTypes: {
    maxRating:  React.PropTypes.number,
    starSize:   React.PropTypes.shape({
      width:  React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired
    }),
    starOn:     React.PropTypes.object,
    starOff:    React.PropTypes.object,
    onChange:   React.PropTypes.func
  },

  getDefaultProps() {
    return {
      maxRating: 5,
      starSize: {
        width: 30,
        height: 30
      },
      starOn: require('./star.png'),
      starOff: require('./star-off.png')
    }
  },

  getInitialState(){
    return {
      rating: 3
    };
  },

  setRating(rating) {
    this.setState({rating: rating});
    if (this.props.onChange) {
      this.props.onChange(rating);
    }
  },

  render() {
    var stars = _.times(this.props.maxRating, i => {
      var source = this.state.rating >= i ? this.props.starOn : this.props.starOff;
      return <Image
        onStartShouldSetResponder={e => true}
        onResponderGrant={() => this.setRating(i)}
        key={i} source={source} style={{height: this.props.starSize.height, width: this.props.starSize.width}}/>;
    });
    return (
      <View style={styles.container}>
        {stars}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

module.exports = StarRating;