import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { Logo } from './Logos';
class Team extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<TouchableOpacity onPress={() => this.props.teamClick(this.props.team)}>
				<Card wrapperStyle={styles.container}>
					<View style={styles.teamContainer}>
						<Text style={styles.team}>{this.props.team.full_name}</Text>
						<Logo team={this.props.team} size={50} />
					</View>
				</Card>
			</TouchableOpacity>
		);
	}
}

export { Team };

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		flexDirection: 'row',
		width: 240,
		justifyContent: 'space-between',

		marginBottom: 5,
	},
	teamContainer: {
		flexDirection: 'row',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	team: {
		fontWeight: 'bold',
		textAlign: 'center',
	},
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
	tinyLogo: {
		width: 50,
		height: 50,
	},
});
