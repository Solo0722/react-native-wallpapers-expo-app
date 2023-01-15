import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/Favorites";
import PictureDetail from "../screens/PictureDetail";
import { FAVORITES, PICTUREDETAIL } from "../constants/routeNames";
import { Platform, StatusBar } from "react-native";

const FavoritesStack = createStackNavigator();

const FavoritesNavigator = () => {
  return (
    <FavoritesStack.Navigator
      initialRouteName={FAVORITES}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
      }}
    >
      <FavoritesStack.Screen name={FAVORITES} component={Favorites} />
      <FavoritesStack.Screen name={PICTUREDETAIL} component={PictureDetail} />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesNavigator;
