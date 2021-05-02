import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import LogoComponents from './logos';

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
		const VisitorLogo = LogoComponents['logo' + this.props.game.visitor_team.abbreviation];
		const HomeLogo = LogoComponents['logo' + this.props.game.home_team.abbreviation];
		return (
			<Card wrapperStyle={styles.container}>
				{/* Team Names */}
				<View style={styles.teams}>
					<Text>{moment(this.props.game.date).isSame(new Date(), 'day') ? 'Today' : moment(this.props.game.date).format('M/D/YY')}</Text>
					<View style={styles.teamLine}>
						<VisitorLogo size={25} style={styles.logo} />
						<Text style={visitorTeamWon ? styles.bold : null}>{this.props.game.visitor_team.abbreviation}</Text>
					</View>
					<View style={styles.teamLine}>
						<HomeLogo size={25} style={styles.logo} />
						<Text style={homeTeamWon ? styles.bold : null}>{this.props.game.home_team.abbreviation}</Text>
					</View>
				</View>
				{/* time of game or quarter/time or final */}
				<View style={styles.timeScore}>
					{/* <Text>{moment(props.game.date).format('h:mm a')}</Text> */}
					<Text style={styles.bold}>{this.props.game.status + (this.props.game.time !== '' ? ' ' + this.props.game.time : '')}</Text>
					{showTimeScore}
				</View>
			</Card>
		);
	}
}

export { Game };

const styles = StyleSheet.create({
	container: {
		borderRadius: 4,
		flexDirection: 'row',
		width: 200,
		justifyContent: 'space-between',
		// padding: 10,
		marginBottom: 5,
	},
	teamLine: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
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
	logo: {
		marginRight: 5,
	},
});
