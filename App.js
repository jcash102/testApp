import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomBar } from './src/Components/BottomNav';

export default function App() {
	return (
		<>
			<StatusBar barStyle="light-content" />
			<BottomBar />
		</>
	);
}

const styles = StyleSheet.create({});
