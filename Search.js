//this routes the app to the mapPlaces componenet when the map icon is selected in the tab bar.

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
                barTintColor="14CC88"
                titleTextColor="white"
                style={styles.container}
                initialRoute={{
            title: 'Map',
            component: MapPlaces
        }}/>            
        );
    }
}
 
module.exports = Search;