'use strict';
 
var React = require('react-native');
var Parse = require('parse/react-native');
var Featured = require('./Featured');
var Search = require('./Search');
var AddLocationTab = require('./AddLocationTab');
var add = require('./Plus.png');
var treasure = require('./Treasure.png');
var list = require('./List.png')

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
                    icon={list}
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
                    icon={add}
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
                    icon={treasure}
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
  tabText: {
    color: 'white',
  }
});
 
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);