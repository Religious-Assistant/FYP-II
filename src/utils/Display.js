/**
 * @author Kinza Kiran
 * @version 1.0
 */

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

export default {setHeight, setWidth};