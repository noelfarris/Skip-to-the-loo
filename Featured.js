//This displays the bathroom list icon in the icon bar.

'use strict';

var React = require('react-native');
var BookList = require('./BookList');
 
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
 
class Featured extends Component {
    render() {
        return (
            <NavigatorIOS
                barTintColor="14CC88"
                titleTextColor="white"
                style={styles.container}
                initialRoute={{
            title: 'Bathroom List',
            component: BookList
            }}/>            
        );
    }
}
 
module.exports = Featured;