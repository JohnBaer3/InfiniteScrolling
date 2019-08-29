// Imports: Dependencies
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, Image, StyleSheet, Text, View } from 'react-native';
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
  // Render Header
  renderHeader = () => {
    try {
      return (
        <Text style={styles.headerText}>Resolve</Text>
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
                <View style = {styles.translucentOuter}>
                    <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/resolve-78171.appspot.com/o/resolve_posts%2FDNbPofoGUxQ0DvVPXZVV%2Ffile_portfolio-profile-pic.jpg?alt=media&token=8575ba98-d953-42b8-964d-07c16b6ddfb3'}} style={styles.backImages} resizeMode='cover' />
                    <View style = {styles.overlay} />
                </View>
                
                <Text style = {styles.title}>
                {item.title}</Text>
                <Text style = {styles.daysLeft}>
                {item.daysLeft} days left</Text>
                <View style = {styles.coinBack} />
                <Text style = {styles.reward}>
                {item.reward} </Text>
                <Text style = {styles.postType}>
                Challenge
                </Text>
                
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
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
  },
  itemContainer: {
    height: 250,
    width: width,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  translucentOuter:{
    marginTop: -150
  },
  backImages:{
    height: 230,
    width: 340,
    borderRadius: 30,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
  title:{
    fontFamily: "ArialRoundedMTBold",
    fontWeight: "bold",
    fontSize: 23,
    color: 'white',
    marginTop: -190,
    marginLeft: -120,
    textAlign: 'left'
  },
  daysLeft:{
    fontFamily: "ArialRoundedMTBold",
    color: 'white',
    marginTop: 110,
    marginLeft: -200
  },
  coinBack:{
    backgroundColor: '#f2d44d',
    height: 40,
    width: 40,
    borderRadius: 20,
    paddingTop: 7,
    paddingLeft: 7,
    marginTop: -170,
    marginLeft: 210
  },
  reward:{
    color: 'white',
    backgroundColor: '#d2b11a',
    height: 33,
    width: 33,
    borderRadius: 20,
    paddingTop: 7,
    paddingLeft: 7,
    marginTop: -37,
    marginLeft: 210
  },
  postType:{
    fontFamily: "ArialRoundedMTBold",
    fontSize: 15,
    color: 'white',
    marginTop: -40,
    marginLeft: -200
  }
});















