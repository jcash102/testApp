import React from 'react';
import { Image } from 'react-native-elements';

class Logo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let teamAbbrev = this.props.team.abbreviation;
		if (this.props.team.abbreviation == 'NOP') {
			teamAbbrev = 'no';
		} else if (this.props.team.abbreviation == 'UTA') {
			teamAbbrev = 'utah';
		}
		let teamImg = `https://a.espncdn.com/i/teamlogos/nba/500/${teamAbbrev}.png`;
		return (
			<Image
				style={{ resizeMode: 'contain', width: this.props.size, height: this.props.size, marginLeft: 10, marginRight: 10 }}
				source={{
					uri: teamImg,
				}}
			/>
		);
	}
}

export { Logo };
