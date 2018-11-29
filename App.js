/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { api } from './services/api';
import axios from 'axios';
import api from './services/api';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const apiRecomendacao = axios.create({
  baseURL: 'https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiClientKey=ff3668967197e707&apiKey=12207f52edfc5c9a&categoryId=356437&count=12&includeMVTData=true&includeStrategyData=true&limit=12&placements=category_page.rr1%7Ccategory_page.rr2%7Ccategory_page.rr3%7Ccategory_page.history&returnMinimalRecItemData=true&sessionId=461.1664156942997201829404234&sgs=VEPAC%3AVEPAC&types=category_page.rr1%7Ccategory_page.rr2%7Ccategory_page.rr3%7Ccategory_page.history&userAttribute=device%3Adesktop&userId=va_201829404253_759.6768214777517'
});

const apiProduto = axios.create({
  baseURL: 'https://restql-server-api-v2-americanas.b2w.io/run-query/catalogo/product-without-promotion/10?offerLimit=10&id='
});

type Props = {};
export default class App extends Component<Props> {
  
  componentDidMount() {
    this.buscarRecomendados().then(res => {
      ids = res;
      
    });    
}

buscarRecomendados = async () => {

  const docs = await apiRecomendacao.get();
  const ids = [];
  docs['data']['placements'][0]['recommendedProducts'].forEach(function(recomendado){
    ids.push(recomendado.id);
  });

  return ids;
}

buscarProdutos = () => {
  const produtos = [];
  ids.forEach(function(id){
    console.log(id);
  });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
