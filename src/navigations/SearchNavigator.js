import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import PictureDetail from "../screens/PictureDetail";
import { PICTUREDETAIL, SEARCH } from "../constants/routeNames";
import { Platform, StatusBar } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const SearchStack = createStackNavigator();

const SearchNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === PICTUREDETAIL) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <SearchStack.Navigator
      initialRouteName={SEARCH}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTransparent: true,
        cardStyle: {
          backgroundColor: "#fff",
          flex: 1,
        },
      }}
    >
      <SearchStack.Screen
        name={SEARCH}
        component={Search}
        options={{
          headerTitle: "",
        }}
      />
      <SearchStack.Screen
        name={PICTUREDETAIL}
        component={PictureDetail}
        options={{
          headerTitle: "",
          headerTintColor: "#fff",
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchNavigator;
