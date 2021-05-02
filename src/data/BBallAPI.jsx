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
	const url = new URL(`${API_URL}games?seasons[]=${CURRENTSEASON}&dates[]=${sendGameDate}`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse);
};

export function GetResponseAllTeams(response) {
	const { data } = response;

	return data;
}

const GetAllTeams = () => {
	const url = new URL(`${API_URL}teams`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse);
};

export function GetResponseGamesByTeam(response) {
	const { data } = response;

	return data;
}

const GetGamesByTeam = () => {
	const url = new URL(`${API_URL}teams`);

	return fetch(url)
		.then((res) => res.json())

		.then(GetResponse);
};

export { GetGames, GetAllTeams, GetGamesByTeam };
