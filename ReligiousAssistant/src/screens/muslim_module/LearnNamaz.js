/**
 * @author Kinza
 * @version 1.0
 */

import {View, Text,  Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import { Button, Center, Modal,Box, HStack, VStack, FlatList, Spacer } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NAMAZ_PLAY_AREA } from '../../navigation/constants';

export default function LearnNamaz() {

  const [showModal, setShowModal] = useState(false);

  function setModal(state){
    setShowModal(state)
  }

  return (
    <View>
      <Text>LearnNamaz</Text>
      {/* <Button onPress={startNamaz}>Learn Namaz</Button> */}
    <Center>
      <Button onPress={() => setShowModal(true)}>Show Modal</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select Rakah to Learn</Modal.Header>
          <Modal.Body>
            <RakahList setModal={setModal}></RakahList>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
    </View>
  );
}


const RakahList = (props) => {

  const navigator=useNavigation()
  function navigateToGame(){
    props.setModal(false)
    navigator.navigate(NAMAZ_PLAY_AREA)
  }

  //Should come from prop

  const data = [{
    namaz:'Fajr',
    id:1,
    rakah:'Sunnah',
    count:2,
  }, {
    namaz:'Fajr',
    id:2,
    rakah:'Farz',
    count:2,
  }];

  return <Box w={{
    base: "100%",
    md: "25%"
  }}>
      <FlatList data={data} keyboardDismissMode keyExtractor={item=>item.id} 
    renderItem={({
      item
    }) =><Pressable onPress={navigateToGame}  >
            <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} justifyContent="space-between">
            
              <VStack>
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.rakah}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.count}
              </Text>
            </HStack>
          </Box>
      </Pressable>
    } />
    </Box>;
};
