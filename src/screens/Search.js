import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Input, IconButton, Icon, ScrollView, Spinner } from "native-base";
import { Feather } from "@expo/vector-icons";
import { client } from "../helpers/pexelClient";
import Masonry from "../components/Masonry";

const Search = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchTermPhotos, setSearchTermPhotos] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerLeft: () => (
          <Input
            onChangeText={(e) => {
              setSearchTerm(e);
            }}
            padding={2}
            height={"10"}
            variant={"rounded"}
            backgroundColor="coolGray.200"
            InputRightElement={
              <IconButton
                variant="ghost"
                icon={
                  <Icon
                    as={<Feather name="search" />}
                    size={5}
                    color="muted.400"
                  />
                }
                onPress={() => fetchSearchTermPhotos(searchTerm)}
              />
            }
            placeholder="Search wallpapers..."
          />
        ),
        headerLeftContainerStyle: { width: "100%", padding: 10 },
      });
    }, [])
  );

  const fetchSearchTermPhotos = async (query) => {
    console.log(query);
    if (query !== "") {
      try {
        setIsLoading(true);
        await client.photos.search({ query: query }).then((photos) => {
          setSearchTermPhotos(photos.photos);
          console.log(photos.photos);
          setIsLoading(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {searchTermPhotos ? (
        <Masonry images={searchTermPhotos} />
      ) : isLoading ? (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.spinnerContainer}>
          <Text>No search made!</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 100,
    paddingHorizontal: 10,
  },
  spinnerContainer: {
    paddingTop: 100,
    alignItems: "center",
  },
});
