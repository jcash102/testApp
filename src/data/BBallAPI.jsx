// import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://www.balldontlie.io/api/v1/';
const CURRENTSEASON = '2020';

export function GetResponse(response) {
	const { data } = response;

	return data;
}

const GetGames = (gameDate) => {
	var sendGameDate;
	if (gameDate == null || gameDate == undefined) {
		sendGameDate = moment().format('YYYY-MM-DD');
		console.log('sendGameDate', sendGameDate);
	}
	//sendGameDate = '2021-04-30';
	const url = new URL(`${API_URL}games?seasons[]=${CURRENTSEASON}&dates[]=${sendGameDate}`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse)
		.then((res) => {
			//API does not return date and time of the game
			//but if it did this is how I would sort it
			res.sort(function compare(a, b) {
				if (b.date !== a.date) return a.date - b.date;
				else {
					return a.id - b.id;
				}
			});

			//adding status any games in this array have started playing but are not final
			let gamesStarted = false;
			for (var i = 0; i < res.length; i++) {
				if (res[i].period > 0 && res[i].status.toUpperCase() !== 'FINAL') gamesStarted = true;
			}
			res.gamesStarted = gamesStarted;
			console.log(res);
			return res;
		});
};

const GetAllTeams = () => {
	const url = new URL(`${API_URL}teams`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse);
};

const GetGamesByTeam = () => {
	const url = new URL(`${API_URL}teams`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse);
};

export { GetGames, GetAllTeams, GetGamesByTeam };
