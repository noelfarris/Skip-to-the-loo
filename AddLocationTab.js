'use strict';
 
var React = require('react-native');
var AddLocation = require('./AddLocation');
 
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
 
class AddLocationTab extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Add a Place',
            component: AddLocation
        }}/>            
        );
    }
}
 
module.exports = AddLocationTab;