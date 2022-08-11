import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {checkConnected} from './CheckConnection';
import NoConnectionScreen from './NoConnectionScreen';

export default function CheckNet() {
  const [connectStatus, setConnectStatus] = useState(false);
  //console.log(connectStatus);

  checkConnected().then(res => {
    setConnectStatus(res);
  });

  const alertSomething = () => {
    alert('alert something');
  };
  return connectStatus ? (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your: {connectStatus} app!</Text>
    </View>
  ) : (
    <NoConnectionScreen
      onCheck={() => {
        checkConnected().then(res => {
          setConnectStatus(res);
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
