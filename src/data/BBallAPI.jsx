// import axios from 'axios';
import moment from 'moment';

const API_URL = 'https://www.balldontlie.io/api/v1/';
const CURRENTSEASON = '2020';
const ITEMSPERPAGE = 25;

export function GetResponse(response) {
	const { data } = response;

	return data;
}

const GetGames = (gameDate, page, teamID) => {
	var sendGameDate;
	var sendTeamID = '';
	let sendPage = 1;
	if (page !== undefined && page !== null) {
		sendPage = page;
	}
	if (gameDate == null || gameDate == undefined) {
		sendGameDate = moment().format('YYYY-MM-DD');
		console.log('sendGameDate', sendGameDate);
	}
	let url;

	if (teamID) {
		url = new URL(`${API_URL}games?seasons[]=${CURRENTSEASON}'&team_ids[]=1&per_page=${ITEMSPERPAGE}&page=${sendPage}`);
	} else {
		url = new URL(`${API_URL}games?seasons[]=${CURRENTSEASON}&dates[]=${sendGameDate}`);
	}
	//sendGameDate = '2021-04-30';

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse)
		.then((res) => {
			//API does not return date and time of the game
			//but if it did this is how I would sort it
			res.sort(function compare(a, b) {
				if (b.date !== a.date) return new Date(a.date) - new Date(b.date);
				else {
					return a.id - b.id;
				}
			});
			console.log('sorted', res);

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

const GetTeam = () => {
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
