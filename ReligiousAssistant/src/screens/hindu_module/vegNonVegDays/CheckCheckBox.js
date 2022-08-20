import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import {Card} from 'native-base';

const data = [
  {id: 1, txt: 'React Native', isChecked: false},
  {id: 2, txt: 'Javascript', isChecked: false},
  {id: 3, txt: 'Laravel', isChecked: false},
  {id: 4, txt: 'PHP', isChecked: false},
  {id: 5, txt: 'jQuery', isChecked: false},
  {id: 6, txt: 'Boostrap', isChecked: false},
  {id: 7, txt: 'HTML', isChecked: false},
];

const CheckCheckBox = () => {
  const [products, setProducts] = React.useState(data);

  const handleChange = id => {
    let temp = products.map(product => {
      if (id === product.id) {
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });
    setProducts(temp);
  };

  let selected = products.filter(product => product.isChecked);

  const renderFlatList = renderData => {
    return (
      <FlatList
        data={renderData}
        renderItem={({item}) => (
          <Card style={{margin: 5}}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Pressable onPress={() => handleChange(item.id)}>
                  <MaterialCommunityIcons
                    name={
                      item.isChecked
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    size={24}
                    color="#000"
                  />
                </Pressable>
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text>{renderFlatList(products)}</Text>
      </View>
      <Text style={styles.text}>Selected </Text>
      <View style={{flex: 1}}>
        <Text>{renderFlatList(selected)}</Text>
      </View>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CheckCheckBox;
