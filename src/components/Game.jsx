import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let showTimeScore;
		let homeTeamWon = false;
		let visitorTeamWon = false;
		// If game has started but not final
		//show score
		if (this.props.game.period > 0 && this.props.game.status.toUpperCase() !== 'FINAL') {
			showTimeScore = (
				<View>
					<Text>{this.props.game.visitor_team_score}</Text>
					<Text>{this.props.game.home_team_score}</Text>
				</View>
			);

			//if game has finished
			//show score and bold the winner
		} else if (this.props.game.status.toUpperCase() == 'FINAL') {
			homeTeamWon = this.props.game.home_team_score > this.props.game.visitor_team_score;
			visitorTeamWon = !homeTeamWon;
			showTimeScore = (
				<View>
					<Text style={visitorTeamWon ? styles.bold : null}>{this.props.game.visitor_team_score}</Text>
					<Text style={homeTeamWon ? styles.bold : null}>{this.props.game.home_team_score}</Text>
				</View>
			);
		} else {
		}

		return (
			<View style={styles.container}>
				{/* Team Names */}
				<View style={styles.teams}>
					<Text>&nbsp;</Text>
					<Text style={visitorTeamWon ? styles.bold : null}>{this.props.game.visitor_team.abbreviation}</Text>
					<Text style={homeTeamWon ? styles.bold : null}>{this.props.game.home_team.abbreviation}</Text>
				</View>
				{/* time of game or quarter/time or final */}
				<View style={styles.timeScore}>
					{/* <Text>{moment(props.game.date).format('h:mm a')}</Text> */}
					<Text style={styles.bold}>{this.props.game.status + (this.props.game.time !== '' ? '&nbsp;' + this.props.game.time : '')}</Text>
					{showTimeScore}
				</View>
			</View>
		);
	}
}

export { Game };

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
