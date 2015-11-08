'use strict';
 
var React = require('react-native');
var Parse = require('parse/react-native');
var Featured = require('./Featured');
var Search = require('./Search');
var AddLocationTab = require('./AddLocationTab');
var Plus = require('./plus.png');
var Treasure = require('./treasure.png');
var List = require('./list.png')

var {
    AppRegistry,
    TabBarIOS,
    Component,
    StyleSheet
   } = React;

Parse.initialize("Ephd4kdFUPOAjPQLne3j0qrDTc9xEoVtInweFsjE", "ll31Fq7cizQDvbAniYNrbK8OHYncAM1FtmAbsjgx");

//This componenet renders the bottom tab bar
class AwesomeProject extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }
 
    render() {
        return (
            <TabBarIOS tintColor="white" barTintColor="14CC88" selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    title='Bathroom List'
                    selected={this.state.selectedTab === 'featured'}
                    icon={List}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title='Add Location'
                    selected={this.state.selectedTab === 'addlocation'}
                    icon={Plus}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'addlocation'
                        });
                    }}>
                    <AddLocationTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    style={styles.tabText}
                    title='Map'
                    selected={this.state.selectedTab === 'search'}
                    icon={Treasure}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'search'
                        });
                    }}>
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}
var styles = StyleSheet.create({
});
 
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);