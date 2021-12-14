import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image } from 'react-native';
import StarRating from 'react-native-star-rating'

export default class Sorozatsajat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    return (
      <View>
        <Text style={{marginBottom:100}}>{this.props.route.params.sorozatnev}</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
      </View>
    );
  }
}