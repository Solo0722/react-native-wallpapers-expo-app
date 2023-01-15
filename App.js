import { StatusBar } from "expo-status-bar";
import { extendTheme, NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import GlobalProvider from "./src/context/context";
import TabNavigator from "./src/navigations/TabNavigator";

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "##831843",
      },
    },
  });

  return (
    // <GlobalProvider>
    <NativeBaseProvider theme={theme}>
      <TabNavigator />
      <StatusBar style="auto" />
    </NativeBaseProvider>
    // </GlobalProvider>
  );
}
