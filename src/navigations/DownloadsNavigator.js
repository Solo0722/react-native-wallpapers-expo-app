import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Downloads from "../screens/Downloads";
import PictureDetail from "../screens/PictureDetail";
import { DOWNLOADS, PICTUREDETAIL } from "../constants/routeNames";
import { Platform, StatusBar } from "react-native";

const DownloadsStack = createStackNavigator();

const DownloadsNavigator = () => {
  return (
    <DownloadsStack.Navigator
      initialRouteName={DOWNLOADS}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: "#fff",
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
      }}
    >
      <DownloadsStack.Screen name={DOWNLOADS} component={Downloads} />
      <DownloadsStack.Screen name={PICTUREDETAIL} component={PictureDetail} />
    </DownloadsStack.Navigator>
  );
};

export default DownloadsNavigator;
