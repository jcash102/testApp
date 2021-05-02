import React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { GetGames } from '../data/BBallAPI';
import { Game } from '../components/Game';

class TodaysGamesScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			games: [],
		};
	}
	componentDidMount() {
		GetGames().then((res) => {
			this.setState({ games: res });
		});
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Today's Games</Text>
				{this.state.games.map((game) => (
					<Game game={game} />
				))}
			</View>
		);
	}
}

export { TodaysGamesScreen };
