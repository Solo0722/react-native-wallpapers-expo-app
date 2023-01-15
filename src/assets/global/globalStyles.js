import React from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default globalStyles = StyleSheet.create({
  globalContainer: {
    backgroundColor: `${colors.WHITE}`,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
