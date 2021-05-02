import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

class Team extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={() => alert('Pressed!')}>
				<View>
					<Text>{this.props.team.full_name}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export { Team };

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: 'red',
		borderRadius: 4,
		flexDirection: 'row',
		width: 200,
		justifyContent: 'space-between',
		padding: 10,
		marginBottom: 5,
	},
	teams: {},
	timeScore: {
		justifyContent: 'center',
		textAlign: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
	loserTeam: {
		opacity: 0.6,
	},
});
