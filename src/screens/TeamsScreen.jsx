import React from 'react';

import { View, Text, ScrollView } from 'react-native';
import { GetAllTeams } from '../data/BBallAPI';
import { Team } from '../components/Team';

class TeamsScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			teams: [],
		};
	}
	componentDidMount() {
		this.callTeams();
	}

	callTeams() {
		GetAllTeams().then((res) => {
			this.setState({ teams: res });
		});
	}

	render() {
		return (
			<ScrollView>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10 }}>Today's Games</Text>
					{this.state.teams.map((team) => (
						<Team key={team.id} team={team} />
					))}
				</View>
			</ScrollView>
		);
	}
}

export { TeamsScreen };
