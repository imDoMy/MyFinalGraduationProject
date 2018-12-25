import React from 'react';
import {View} from 'react-native';


const Section = (props) => {
	return (
	<View style={styles.containerStyle}>
	{props.children}
	</View>
	);
};

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		backgroundColor: '#e6f3ff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		postion: 'relative'
	}
}

export { Section };
