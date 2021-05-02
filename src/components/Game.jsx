import React from 'react';
import { View, Text } from 'react-native';

const Game = (props) => {
	return (
		<View>
			<Text>
				{props.game.home_team.name} vs. {props.game.visitor_team.name}
			</Text>
		</View>
	);
};

export { Game };
