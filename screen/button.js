// import React, { Component } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// export default class RadioButton extends Component {
// 	state = {
// 		value: null,
// 	};

// 	render() {
// 		const { PROP } = this.props;
// 		const { value } = this.state;

// 		return (
// 			<View style = {{flexDirection:'row'}}>
// 				{PROP.map(res => {
// 					return (
// 						<View key={res.key} style={styles.container}>
// 							<Text style={styles.radioText}>{res.text}</Text>
// 							<TouchableOpacity
// 								style={styles.radioCircle}
// 								onPress={() => {
// 									this.setState({
// 										value: res.key,
// 									});
// 								}}>
//                                   {value === res.key && <View style={styles.selectedRb} />}
// 							</TouchableOpacity>
// 						</View>
// 					);
// 				})}
//                 {/* {alert('Selected'+this.state.value)} */}
//                 {/* <Text> Selected: {this.state.value} </Text> */}
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
//         marginBottom: 10,
//         alignItems: 'center',
//         flexDirection: 'row',
// 		// justifyContent: 'space-between',
// 	},
//     radioText: {
//         marginRight: 5,
//         marginLeft:7,
//         fontSize: 15,
//         color: '#ffff',
//         fontWeight: '700',
//         flexDirection:'row'
//     },
// 	radioCircle: {
// 		height: 17,
// 		width: 17,
// 		borderRadius: 100,
// 		borderWidth: 2,
// 		borderColor: '#ffff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	selectedRb: {
// 		width: 10,
// 		height: 10,
// 		borderRadius: 50,
// 		backgroundColor: '#ffff',
//     },
//     result: {
//         marginTop: 20,
//         color: 'white',
//         fontWeight: '600',
//         backgroundColor: '#F3FBFE',
//     },
// });