import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DOWNLOADSNAVIGATOR,
  FAVORITESNAVIGATOR,
  HOMENAVIGATOR,
  SEARCHNAVIGATOR,
} from "../constants/routeNames";
import HomeNavigator from "./HomeNavigator";
import FavoritesNavigator from "./FavoritesNavigator";
import SearchNavigator from "./SearchNavigator";
import DownloadsNavigator from "./DownloadsNavigator";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={HOMENAVIGATOR}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size = 23 }) => {
            let iconName;

            if (route.name === HOMENAVIGATOR) {
              iconName = "home";
              size = focused ? 23 : 18;
            } else if (route.name === FAVORITESNAVIGATOR) {
              iconName = "heart";
              size = focused ? 23 : 18;
            } else if (route.name === SEARCHNAVIGATOR) {
              iconName = "search";
              size = focused ? 23 : 18;
            } else if (route.name === DOWNLOADSNAVIGATOR) {
              iconName = "download";
              size = focused ? 23 : 18;
            }

            // You can return any component that you like here!
            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: `${colors.PRIMARY}`,
          tabBarInactiveTintColor: "#737373",
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5,
            elevation: 5,
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          options={{ tabBarLabel: "Explore" }}
          name={HOMENAVIGATOR}
          component={HomeNavigator}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Favorites" }}
          name={FAVORITESNAVIGATOR}
          component={FavoritesNavigator}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Search" }}
          name={SEARCHNAVIGATOR}
          component={SearchNavigator}
        />
        <Tab.Screen
          options={{ tabBarLabel: "Downloads" }}
          name={DOWNLOADSNAVIGATOR}
          component={DownloadsNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
