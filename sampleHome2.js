// Imports: Dependencies
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Image, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { database } from './App';
// Screen Dimensions
const { height, width } = Dimensions.get('window');
// Screen: Infinite Scroll
export default class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      limit: 11,
      lastVisible: null,
      loading: false,
      refreshing: false,
      pos: 80
    };
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
      // Cloud Firestore: Initial Query
      this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve Data
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
      });
      console.log('Retrieving Data');
      // Cloud Firestore: Query
      let initialQuery = await database.collection('resolve_posts')
        .limit(this.state.limit)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await initialQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].daysLeft;
      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve More
  retrieveMore = async () => {
    try {
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      console.log('Retrieving additional Data');
      // Cloud Firestore: Query (Additional Query)
      let additionalQuery = await database.collection('resolve_posts')
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit)
      // Cloud Firestore: Query Snapshot
      let documentSnapshots = await additionalQuery.get();
      // Cloud Firestore: Document Data
      let documentData = documentSnapshots.docs.map(document => document.data());
      // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
      let lastVisible = documentData[documentData.length - 1].daysLeft;
      // Set State
      this.setState({
        documentData: [...this.state.documentData, ...documentData],
        lastVisible: lastVisible,
        refreshing: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  buttonPress = () => {
    const {pos} = this.state
    
    this.setState({
        pos: this.state.pos-10
    })
  }
  
  selected = function(pos) {
      return {
        backgroundColor: 'pink',
        borderRadius: 15,
        height: 30,
        width: 70,
        marginTop: -30,
        marginLeft: pos
      }
  }


  // Render Header
  renderHeader = () => {
    const {pos} = this.state
    
    try {
      return (
        //<View style = {styles.headerTextInput} placeholder = "Search" />
        
        <View style = {styles.headerBar}>
          <Image style = {styles.profilePic} source={require('./images/zion.png')}/>
          <View style = {this.selected(pos)} />
          <View style = {styles.headerButtonOuter}>
              
              <Image style = {styles.headerButton} source={require('./images/questionButton.png')} />
              
              <Image style = {styles.headerButton} source={require('./images/challengeButton.png')} />
              <Image style = {styles.headerButton} source={require('./images/charityButton.png')} />
              <Image style = {styles.headerButton} source={require('./images/serviceButton.png')} />
           </View>
           <Image style = {styles.search} source={require('./images/search.png')}/>
        </View>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Footer
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };
        
//https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/resolve_posts%2FDNbPofoGUxQ0DvVPXZVV%2Ffile_portfolio-profile-pic.jpg?alt=media&token=8575ba98-d953-42b8-964d-07c16b6ddfb3
        
//'${item.attachments}'
        
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          // Data
          data={this.state.documentData}
          // Render Items
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
                <View style = {styles.backBox}>
                    <Image source = {require('./images/zion.png')} style = {styles.zion} />
                    <Text style = {styles.name}>
                        Jay McClutcheon
                    </Text>
                    <Text style = {styles.username}>
                        @Jclutch
                    </Text>
                    
                    <Text style = {styles.title}>
                    {item.title}</Text>
                    
                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/resolve_posts%2FDNbPofoGUxQ0DvVPXZVV%2Ffile_portfolio-profile-pic.jpg?alt=media&token=8575ba98-d953-42b8-964d-07c16b6ddfb3'}} style={styles.backImages} resizeMode='cover' />
                    
                    <View style = {{width: '90%', marginLeft: 20}}>
                        <Text style = {styles.infoText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        </Text>
                    </View>

                    <Text style = {styles.enterSubmission}>
                        Enter Submission
                    </Text>
                
                </View>
            </View>
          )}
          // Item Key
          keyExtractor={(item, index) => String(index)}
          // Header (Title)
          ListHeaderComponent={this.renderHeader}
          // Footer (Activity Indicator)
          ListFooterComponent={this.renderFooter}
          // On End Reached (Takes a function)
          onEndReached={this.retrieveMore}
          // How Close To The End Of List Until Next Data Request Is Made
          onEndReachedThreshold={0}
          // Refreshing (Set To True When End Reached)
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    )
  }
}
// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'gainsboro'
  },
  headerTextInput: {
    height: 28,
    fontFamily: 'System',
    fontSize: 15,
    color: '#000',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 7,
  },
  headerBar:{
    backgroundColor: 'white',
    height: 40,
    width: width,
    alignItems: 'stretch',
  },
  profilePic:{
    height: 32,
    width: 32,
    marginTop: 4,
    marginLeft: 20
  },
  headerButtonOuter:{
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    width: '60%',
    marginTop: -30,
    marginLeft: 80,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  headerButton:{
     height: 20,
     width: 30,
     marginLeft: 10,
     marginRight: 10,
     marginTop: 5,
  },
  search:{
    height: 30,
    width: 30,
    marginTop: -30,
    marginLeft: 330
  },
  itemContainer: {
    height: 375,
    width: width,
    marginTop: 20,
    borderColor: '#000',
  },
  backBox:{
    height: 365,
    width: '90%', 
    backgroundColor: 'white',
    marginLeft: 18
  },
  zion:{
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 20
  },
  name:{
    color: 'black',
    fontFamily: "ArialRoundedMTBold",
    fontSize: 14,
    marginLeft: 65,
    marginTop: -30
  },
  username:{
    color: 'black',
    fontSize: 14,
    marginLeft: 65
  },
  title:{
    fontFamily: "ArialRoundedMTBold",
    fontWeight: "bold",
    fontSize: 23,
    color: 'black',
    marginTop: 0,
    marginLeft: 20,
    textAlign: 'left'
  },
  backImages:{
    height: 150,
    width: 270,
    marginTop: 10,
    marginLeft: 30
  },
  enterSubmission:{
    backgroundColor: '#23a3ff',
    height: 25,
    width: 130,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 7,
    color: 'white',
    marginLeft: 100,
    marginTop: 5
  }
  
});















