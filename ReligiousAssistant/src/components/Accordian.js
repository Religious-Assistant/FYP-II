/**
 * @author Kinza Kiran
 * @version 1.0
 */

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

//theme
import colors from '../theme/colors';
import fonts from '../theme/fonts';

//icon
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.rakatsInfo,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View style={{marginLeft: '4%', marginBottom: '3%'}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}
          activeOpacity={1}>
          <Text style={[styles.title]}>{this.props.namazTime}</Text>
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={true}
              renderItem={({item, index}) => (
                <View>
                  <View
                    activeOpacity={0.5}
                    style={[
                      styles.childRow,
                      styles.button,
                      item.value ? styles.btnActive : styles.btnInActive,
                    ]}
                    onPress={() => this.onClick(index)}>
                    <Text style={[styles.itemInActive]}>{item.rakatName}</Text>
                    <Text style={[styles.itemInActive]}>{item.rakats}</Text>
                  </View>
                  <View style={styles.childHr} />
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }

  onClick = index => {
    const temp = this.state.data.slice();
    temp[index].value = !temp[index].value;
    this.setState({data: temp});
  };

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.Signika.bold,
    color: colors.white,
  },
  itemInActive: {
    fontSize: 15,
    fontFamily: fonts.Signika.regular,
    color: colors.black,
  },
  btnActive: {
    borderColor: colors.success.deep,
  },
  btnInActive: {
    borderColor: colors.cover,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: colors.tertiary,
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cover,
  },
  parentHr: {
    height: 1,
    color: colors.white,
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: colors.tertiary,
    width: '100%',
  },
});
