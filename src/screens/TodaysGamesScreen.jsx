import React from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { GetGames } from '../data/BBallAPI';
import { Game } from '../components/Game';

class TodaysGamesScreen extends React.Component {
	constructor() {
		super();
		this.UPDATETIME = 60000;
		this.state = {
			games: [],
			timer: null,
		};
	}
	componentDidMount() {
		this.callGames();
		console.log(this.state.games);
	}

	componentWillUnmount() {
		console.log('unmounting');
		clearInterval(this.state.timer);
	}

	callGames() {
		GetGames().then((res) => {
			this.setState({ games: res });

			//checks if status of game has started then refresh game data every minute
			//if there are no games in play then clears the interval
			if (this.state.games.gamesStarted && this.state.timer == null) {
				this.state.timer = setInterval(this.callGames.bind(this), this.UPDATETIME);
			} else if (!this.state.games.gamesStarted && this.state.timer !== null) {
				clearInterval(this.state.timer);
			}
		});
	}

	renderItem(game) {
		return <Game game={game.item} />;
	}
	render() {
		return (
			<ScrollView>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10 }}>Today's Games</Text>
					<FlatList data={this.state.games} renderItem={this.renderItem} keyExtractor={(item) => item.id.toString()} />
				</View>
			</ScrollView>
		);
	}
}

export { TodaysGamesScreen };
