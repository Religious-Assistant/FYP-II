import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ACCOUNTABILITY, ADD_MOSQUE, ANNOUNCEMENTS, AUTO_SILENT, FIND_MOSQUE, LEARN_NAMAZ, QIBLA_DIRECTION, RAKAH_INFO, RECITE_QURAN, REGISTERED_MUSLIM_HOME_STACK, TASBIH_COUNTER, VIEW_CALANDER } from './constants';

import RegisteredMuslimDashboard from '../screens/muslim_module/RegisteredMuslimDashboard';
import ReciteQuran from '../screens/muslim_module/ReciteQuran';
import FindMosque from '../screens/muslim_module/FindMosque';
import Calander from '../screens/muslim_module/Calander';
import LearnNamaz from '../screens/muslim_module/LearnNamaz';
import Accountability from '../screens/muslim_module/Accountability'
import Announcements from '../screens/muslim_module/Announcements'
import RakahInfo from '../screens/muslim_module/RakahInfo';
import QiblaDirection from '../screens/muslim_module/QiblaDirection';
import TasbihCounter from '../screens/muslim_module/TasbihCounter';
import AddMosque from '../screens/muslim_module/AddMosque';
import AutoSilent from '../screens/muslim_module/AutoSilent';

const HomeStack=createNativeStackNavigator();

function MuslimDashboardNavigation(){
    return(
        
        <HomeStack.Navigator initialRouteName={REGISTERED_MUSLIM_HOME_STACK} >
            <HomeStack.Screen name={REGISTERED_MUSLIM_HOME_STACK} component={RegisteredMuslimDashboard} options={{headerShown:false}} />
            <HomeStack.Screen name={RECITE_QURAN} component={ReciteQuran} options={{headerShown:false}}/>
            <HomeStack.Screen name={FIND_MOSQUE} component={FindMosque} />
            <HomeStack.Screen name={VIEW_CALANDER} component={Calander} />

            <HomeStack.Screen name={LEARN_NAMAZ} component={LearnNamaz}/>
            <HomeStack.Screen name={ACCOUNTABILITY} component={Accountability} />
            <HomeStack.Screen name={ANNOUNCEMENTS} component={Announcements} />
            
            <HomeStack.Screen name={AUTO_SILENT} component={AutoSilent}/>
            <HomeStack.Screen name={ADD_MOSQUE} component={AddMosque} />
            <HomeStack.Screen name={TASBIH_COUNTER} component={TasbihCounter} />
            
            <HomeStack.Screen name={QIBLA_DIRECTION} component={QiblaDirection}/>
            <HomeStack.Screen name={RAKAH_INFO} component={RakahInfo} />
            
        </HomeStack.Navigator>
        
    )
}

export default MuslimDashboardNavigation;