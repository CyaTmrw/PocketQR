import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	fullContainer: {
		flex: 100,
		padding: 20
	},
	logoHalfContainer: {
		flex: 50
	},
	buttonHalfContainer: {
		flex: 50,
		flexDirection: "column",
		justifyContent: "space-around"
	},
	inputBigContainer: {
		flex: 80
	},
	buttonBigContainer: {
		flex: 80,
		justifyContent: "space-around"
	},
	buttonSmallContainer: {
		flex: 20,
		justifyContent: "center"
	},
	textSmallContainer: {
		justifyContent: "center",
		flex: 20,
		paddingHorizontal: 20
	},
	input: {
		height: 60,
		marginTop: 5,
		marginBottom: 5,
		paddingHorizontal: 10,
		fontSize: 24
	},
	picker: {
		marginTop: 15,
		marginBottom: 15
	},
	text:{
		paddingHorizontal: 10,
		fontSize: 15,
	}
});

export default styles;
