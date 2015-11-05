//Component shows details of place when selected from list view or from a map annotation. 

'use strict';
 
var Parse = require('parse/react-native');
var ParseReact = require('parse-react');
var React = require('react-native');
var Button = require('react-native-button');
var Review = require('./Review');
var StarRating = require('./StarRating');
 
var {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Component,
    Image,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;
 
var styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginBottom: 75
    },
    image: {
        width: 375,
        height: 165,
        padding: 10,
    },
    rating: {
        padding: 10,
        fontSize: 15,
        color: '#FBBC05'
    },
    address: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    },
    containerList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
    thumbnail: {
        width: 53,
        height: 53,
        marginRight: 10,
        borderRadius: 25
    },
    rightContainer: {
        flex: 1,
    },
    addressList: {
        color: '#656565',
        fontSize: 12
    },
    ratingList: {
        color: '#FBBC05',
        marginBottom: 0,
        fontSize: 12
    },
    listView: {
       backgroundColor: '#F5FCFF'
   },
    reviewbutton: {
        color: '#A514CC',
        borderRadius: 10
    }
});
 
class PlaceDetail extends Component {
//Creating constructor for review list view
    constructor(props) {
       super(props);
       this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({
               rowHasChanged: (row1, row2) => row1 !== row2
           })
        };
    }

    componentWillMount() {
        var query = new Parse.Query('Review');
        query.equalTo('placeID', this.props.place).descending('createdAt').limit(5)
        query.find()
        .then((results) => {
            console.log('GOT REVIEWS')
            console.log(results);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(results),
                isLoading: false
            });
        })
    }

     showPlaceDetail(place) {
        this.props.navigator.push({
            title: place.get('title'),
            component: Review,
            passProps: {place: place}
       });
   }

    render(review) {
        var place = this.props.place;
        var imageURI = (typeof place.get('imageLinks') !== 'undefined') ? place.get('imageLinks') : '';
        var rating = (typeof place.get('rating') !== 'undefined') ? place.get('rating') : '';
        var address = (typeof place.get('address') !== 'undefined') ? place.get('address') : '';
        var open = (typeof place.get('Open') !== 'undefined') ? place.get('Open') : '';
        var close = (typeof place.get('Close') !== 'undefined') ? place.get('Close') : '';
        var pub;
        if(place.get('Public') === true) {
            pub = 'Yes'
        } else {
            pub = 'No'
        };
        // var sum = {review.get('cleanliness')}.reduce(function(a, b) { return a + b; });
        // var avg = sum / {review.get('cleanliness')}.length;
        return (
            <ScrollView>
            <View>
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageURI}} />
                <Text style={styles.rating}> Loo Rolls</Text>
                <Text style={styles.address}>Public: {pub}</Text>
                <Text style={styles.address}>Hours: {open} - {close}</Text>
                <Text style={styles.address}>{address}</Text>
                <Button
                    style={{backgroundColor: '#A514CC', borderRadius: 10, color: 'white', padding: 5, marginLeft: 10}}
                    onPress={() => this.showPlaceDetail(place)}>
                    Add Review
                </Button>
            </View>
            <Text style={styles.address}>Newest Reviews</Text>
            <ListView
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSource}
                renderRow={this.renderReview.bind(this)}
                style={styles.listView}
                initialListSize={5}
                scrollEnabled={false}
            />
            </View>
            </ScrollView>
        );
            
    }
    
    renderReview(review) { 
    console.log(review);
       return (
            <TouchableHighlight>

                <View>
                    <View style={styles.containerList}>
                        <Image
                            source={{uri: "https://lh3.googleusercontent.com/-THqdXvH6sN0/AAAAAAAAAAI/AAAAAAAAAFk/F2_A6FTu13M/s120-c/photo.jpg"}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.ratingList}>{review.get("overall")} loo rolls</Text>
                            <Text style={styles.addressList}>{review.get("text")}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
}
 
module.exports = PlaceDetail;