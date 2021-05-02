import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomBar, StackedBottomBar } from './src/Components/BottomNav';

export default function App() {
	return (
		<>
			<StatusBar barStyle="light-content" />
			{/* <BottomBar /> */}
			<StackedBottomBar />
		</>
	);
}

const styles = StyleSheet.create({});
