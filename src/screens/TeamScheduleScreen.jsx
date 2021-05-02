import React from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { GetGames } from '../data/BBallAPI';
import { Game } from '../components/Game';

class TeamScheduleScreen extends React.Component {
	constructor({ route, navigation }) {
		super();

		this.state = {
			team: route.params.team,
			games: [],
			loadingMore: false,
			currentPage: 1,
		};
	}
	componentDidMount() {
		console.log(this.props, this.state.teamID);
		this.callGames();
	}

	componentWillUnmount() {
		console.log('unmounting');
		// clearInterval(timer);
	}
	handleLoadMore = () => {
		this.setState(
			(prevState, nextProps) => ({
				currentPage: prevState.currentPage + 1,
				loadingMore: true,
			}),
			() => {
				this.callGames(true);
			},
		);
	};

	callGames() {
		GetGames(null, this.state.currentPage, this.state.team.id).then((res) => {
			if (this.state.currentPage == 1) {
				this.setState({ games: res });
			} else {
				this.setState({ games: [...this.state.games, ...res] });
			}

			//checks if status of game has started then refresh game data every minute
			//if there are no games in play then clears the interval
			// if (this.state.games.gamesStarted && this.state.timer == null) {
			// 	this.state.timer = setInterval(this.callGames.bind(this), this.UPDATETIME);
			// } else if (!this.state.games.gamesStarted && this.state.timer !== null) {
			// 	clearInterval(this.state.timer);
			// }
		});
	}

	renderItem(game) {
		// console.log('game', game);
		return <Game game={game.item} />;
	}
	render() {
		return (
			<ScrollView>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10 }}>{this.state.team.name} Schedule</Text>
					<FlatList
						data={this.state.games}
						renderItem={this.renderItem}
						keyExtractor={(item, index) => item.id.toString()}
						onEndReached={() => {
							console.log('load more');
							this.handleLoadMore();
						}}
						onEndReachedThreshold={0.5}
						initialNumToRender={10}
					/>
				</View>
			</ScrollView>
		);
	}
}

export { TeamScheduleScreen };
