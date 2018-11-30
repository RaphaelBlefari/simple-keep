/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { Card, ListItem, Button, Icon , PricingCard , Header} from 'react-native-elements'
import axios from 'axios';

const apiRecomendacao = axios.create({
  baseURL: 'https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiClientKey=ff3668967197e707&apiKey=12207f52edfc5c9a&categoryId=356437&count=12&includeMVTData=true&includeStrategyData=true&limit=12&placements=category_page.rr1%7Ccategory_page.rr2%7Ccategory_page.rr3%7Ccategory_page.history&returnMinimalRecItemData=true&sessionId=461.1664156942997201829404234&sgs=VEPAC%3AVEPAC&types=category_page.rr1%7Ccategory_page.rr2%7Ccategory_page.rr3%7Ccategory_page.history&userAttribute=device%3Adesktop&userId=va_201829404253_759.6768214777517'
});

const apiProduto = axios.create({
  baseURL: 'https://restql-server-api-v2-americanas.b2w.io/run-query/catalogo/product-without-promotion'
});

type Props = {};
export default class App extends Component<Props> {
  
state = {
  Produtos: []
};

  componentDidMount() {
    this.buscarRecomendados();
}

buscarRecomendados = async () => {

  const docs = await apiRecomendacao.get();
  const ProdutosIds = [];
  docs['data']['placements'][0]['recommendedProducts'].forEach(function(recomendado){
     ProdutosIds.push(recomendado.id);
  });
  this.buscarProdutos(ProdutosIds);  
}

buscarProdutos =  (ids) => {

const Produtos = this.state.Produtos;
var atual = this;
  ids.forEach(function (id){
    apiProduto.get('10?offerLimit=10&id='+id).then(res => {
      Produtos.push(res.data);
      console.log(res.data.installment.result[0].value);
      atual.setState({ Produtos });               
    });
  })
}

validaValor(valor){
//poisé.
try{
    if(valor.result[0].value)
      {
          return valor.result[0].value;
      }
  }catch(ex) {
    return 0;
    }
  }

render() {
    return (

  
      <View>
        <Header
          
          centerComponent={{ text: 'Keep Simple', style: { color: '#fff' } }}
        />
      <ScrollView style={styles.rodape}>

      {this.state.Produtos.map(data => {
          return (
              <Card key={data.product.result.id} title={data.product.result.name}>              
                <View style={styles.instructions} key={data.product.result.id} style={styles.titulo}>
                  <Image
                    style = {styles.imagem}                    
                    source={{ uri : data.product.result.images[0].medium}}
                  />                  
                  <Text style={styles.texto}>R$ {this.validaValor(data.installment)}</Text>                  
                </View>            
              </Card>              
          );
        })
      }
      <Text style={styles.texto} > Criado por Raphael blefari</Text>  
      </ScrollView>
      <View>
            
      </View>
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
  imagem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    marginLeft: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  titulo: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 24,
  },
  texto: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 28,
    marginTop: 10,
  },  
  rodape: {
    marginBottom: 120,
  },

});
