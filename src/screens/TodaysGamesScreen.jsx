import React from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { GetGames } from '../data/BBallAPI';
import { Game } from '../components/Game';
import { Icon, Button } from 'react-native-elements';
import moment from 'moment';

class TodaysGamesScreen extends React.Component {
	constructor() {
		super();
		this.UPDATETIME = 60000;
		this.state = {
			games: [],
			timer: null,
			currentGameDateSelected: moment().format('YYYY-MM-DD'),
		};
	}
	componentDidMount() {
		this.callGames();
		// console.log(this.state.games);
	}

	componentWillUnmount() {
		// console.log('unmounting');
		clearInterval(this.state.timer);
	}

	callGames(gameDate) {
		// console.log('gamedate', gameDate);
		GetGames(gameDate).then((res) => {
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
	showMoreGames(daysToAdd) {
		let sendGameDate = moment(this.state.currentGameDateSelected).add(daysToAdd, 'days').format('YYYY-MM-DD');
		this.setState({ currentGameDateSelected: sendGameDate });
		// console.log(sendGameDate);
		this.callGames(sendGameDate);
	}
	goToToday() {
		this.setState({ currentGameDateSelected: new Date() });
		this.callGames();
	}

	renderItem(game) {
		return <Game game={game.item} />;
	}
	render() {
		let isSelectedDateToday = moment(this.state.currentGameDateSelected).isSame(new Date(), 'day');
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ flexDirection: 'row' }}>
					<Icon raised name="chevron-circle-left" type="font-awesome" color="#AB0E00" onPress={() => this.showMoreGames(-1)} />
					<Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10 }}>{isSelectedDateToday ? "Today's" : moment(this.state.currentGameDateSelected).format('M/D/YY')} Games</Text>
					<Icon raised name="chevron-circle-right" type="font-awesome" color="#AB0E00" onPress={() => this.showMoreGames(1)} />
				</View>
				{!isSelectedDateToday && <Button title="Go to Today's Games" type="outline" onPress={() => this.goToToday()} />}

				<FlatList data={this.state.games} renderItem={this.renderItem} keyExtractor={(item) => item.id.toString()} />
			</View>
		);
	}
}

export { TodaysGamesScreen };
