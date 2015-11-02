'use strict';
 
var React = require('react-native');
var Parse = require('parse/react-native');
var Featured = require('./Featured');
var Search = require('./Search');
var AddLocation = require('./AddLocation')


var {
    AppRegistry,
    TabBarIOS,
    Component
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
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'featured'}
                    icon={{uri:'featured'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'featured'
                        });
                    }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'addlocation'}
                    icon={{uri:'contacts'}}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'addlocation'
                        });
                    }}>
                    <AddLocation/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    selected={this.state.selectedTab === 'search'}
                    icon={{uri:'search'}}
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
 
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);