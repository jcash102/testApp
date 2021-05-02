import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BottomBar, StackedBottomBar } from './src/Components/BottomNav';
import { ThemeProvider } from 'react-native-elements';

const theme = {
	colors: {
		primary: '#AB0E00',
	},
};

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<StatusBar barStyle="light-content" />

			<StackedBottomBar />
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({});
