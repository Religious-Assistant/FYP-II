import React from "react";
import { Text,View,StyleSheet } from "react-native";
import { Box,Center,ZStack,NativeBaseProvider,FlatList,Image } from "native-base";
import { useTheme } from "native-base";
import { useEffect } from "react";

import colors from "../theme/colors";

function SplashScreeen(){
    return(
   <View style={styles.container}>
    <Center h="38">
      <Box mt="86">
        <ZStack mt="-19" ml={-100}>
          <Box bg={colors.secondary} size="40" rounded="full" shadow={3} />
        </ZStack>
      </Box>
    </Center>
    <Center>
      <Box mt="420" ml="-280">
        <ZStack mt="20" ml={-80}>
          <Box bg={colors.secondary} size="330" rounded="full" shadow={3} />
        </ZStack>
      </Box>
    </Center>
   </View>
 )
}
const styles = StyleSheet.create( { 
    container: { 
        height: '100%', 
        alignItems:'flex-end',
        backgroundColor: colors.primary,
        opacity:0.9
        
 } });

export default SplashScreeen;