'use strict';
 
var React = require('react-native');
var MapPlaces = require('./MapPlaces');
 
var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;
 
var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
class Search extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Map',
            component: MapPlaces
        }}/>            
        );
    }
}
 
module.exports = Search;