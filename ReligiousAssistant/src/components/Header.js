/**
 * @author: Nadir Hussain
 * @version: 1.0
 * 
 */

import { StyleSheet, Text, View, Image } from 'react-native'
import { Heading } from 'native-base'
import React from 'react'
import fonts from '../theme/fonts'
import colors from '../theme/colors'

const Header = (props) => {
    const{title1, title2, backgroundColor, height,image, title1Size, title2Size, title1Family, title2Family, title1Color, title2Color}=props

    return (
        <View
        style={{
          flex: height,
          backgroundColor: colors.primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <Image
            source={image}
            style={{
              marginTop: '12%',
              marginRight: '5%',
              height: 100,
              width: 100,
            }}
            alt="icon .."
          />
        </View>
        <View style={{flex: 0.9, alignItems: 'flex-start', margin: '2%', flexDirection:'column'}}>
          <Heading color={title1Color} marginLeft="10%" marginTop={'7%'}>
            <Text style={{fontFamily: title1Family, fontSize:title1Size,}}>
              {title1}
            </Text>
            </Heading>
            <Heading color={title2Color} marginLeft="10%" marginTop={'2%'}>
              <Text style={{fontFamily: title2Family, fontSize:title2Size}}>
                {title2}
              </Text>
          </Heading>
        </View>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({})