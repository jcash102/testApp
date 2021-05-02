import React from 'react';

import { View, Text, ScrollView, FlatList } from 'react-native';
import { GetAllTeams } from '../data/BBallAPI';
import { Team } from '../components/Team';
import { TeamScheduleScreen } from './TeamScheduleScreen';

class TeamsScreen extends React.Component {
	constructor(props) {
		super();
		this.state = {
			teams: [],
		};
		this.clickedTeam = this.clickedTeam.bind(this);
	}
	componentDidMount() {
		console.log('this.props', this.props);
		this.callTeams();
	}

	callTeams() {
		GetAllTeams().then((res) => {
			this.setState({ teams: res });
		});
	}

	clickedTeam(team) {
		console.log('go to team schedule', team);
		this.props.navigation.navigate('TeamScheduleScreen', TeamScheduleScreen);
	}

	renderItem = (team) => {
		return <Team team={team.item} teamClick={this.clickedTeam} />;
	};

	render() {
		return (
			<ScrollView>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10 }}>Today's Games</Text>
					<FlatList data={this.state.teams} renderItem={this.renderItem} keyExtractor={(item) => item.id.toString()} />
					{/* {this.state.teams.map((team) => (
						<Team key={team.id} team={team} />
					))} */}
				</View>
			</ScrollView>
		);
	}
}

export { TeamsScreen };
