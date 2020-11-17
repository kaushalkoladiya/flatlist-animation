import { StatusBar } from "expo-status-bar";
import React from "react";

// navigator
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// components
// import Home from "./src/screens/Home";
import FlatList from "./src/screens/FlatList";

type RootStackParamList = {
  Home: undefined;
  FlatList: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const App = () => {
  // return (
  //   <NavigationContainer>
  //     {/* Our navigator must be child component of NavigationContainer */}
  //     <Navigator initialRouteName="FlatList">
  //       <Screen name="Home" component={Home} />
  //       <Screen name="FlatList" component={FlatList} />
  //     </Navigator>
  //   </NavigationContainer>
  // );
  return <FlatList />;
};

export default App;
