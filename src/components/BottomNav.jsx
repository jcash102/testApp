import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TodaysGamesScreen } from '../Screens/TodaysGamesScreen';
import { TeamsScreen } from '../Screens/TeamsScreen';

const Tab = createBottomTabNavigator();
const BottomBar = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Today') {
							iconName = focused ? 'calendar' : 'calendar-outline';
						} else if (route.name === 'Teams') {
							iconName = focused ? 'list' : 'list-outline';
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: '#AB0E00',
					inactiveTintColor: 'gray',
					keyboardHidesTabBar: true,
				}}
			>
				<Tab.Screen name="Today" component={TodaysGamesScreen} />
				<Tab.Screen name="Teams" component={TeamsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export { BottomBar };