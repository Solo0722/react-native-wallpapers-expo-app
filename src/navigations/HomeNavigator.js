import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import PictureDetail from "../screens/PictureDetail";
import { CATEGORIES, HOME, PICTUREDETAIL } from "../constants/routeNames";
import Categories from "../screens/Categories";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const HomeStack = createStackNavigator();

const HomeNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === PICTUREDETAIL) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else if (routeName === CATEGORIES) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <HomeStack.Navigator
      initialRouteName={HOME}
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
      <HomeStack.Screen
        name={HOME}
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={CATEGORIES} component={Categories} />
      <HomeStack.Screen
        name={PICTUREDETAIL}
        component={PictureDetail}
        options={{
          headerTitle: "",
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
