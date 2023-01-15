import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { Heading, FlatList, Spinner } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { client } from "../helpers/pexelClient";
import Masonry from "../components/Masonry";
import { CATEGORIES_ARRAY } from "../constants/general";
import { CATEGORIES } from "../constants/routeNames";

const Home = ({ navigation }) => {
  const [trendingPhotos, setTrendingPhotos] = React.useState(null);
  const [randomPhoto, setRandomPhoto] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTrendingPhotos = async () => {
        try {
          await client.photos.curated({ page: 1 }).then((photos) => {
            setTrendingPhotos(photos.photos);
          });
        } catch (e) {
          console.log(e);
        }
      };
      const fetchRandomPhoto = async () => {
        try {
          await client.photos.random().then((photo) => {
            setRandomPhoto(photo);
          });
        } catch (e) {
          console.log(e);
        }
      };

      fetchRandomPhoto();
      fetchTrendingPhotos();
    }, [])
  );

  return (
    <ScrollView style={styles.homeContainer}>
      <ImageBackground
        style={styles.searchBarContainer}
        source={{ uri: randomPhoto && randomPhoto.src.original }}
        // loadingIndicatorSource={require("../assets/images/imgbg.jpg")}
        defaultSource={require("../assets/images/imgbg.jpg")}
      ></ImageBackground>
      <View style={styles.categoriesContainer}>
        <Heading
          mt="1"
          mb="2"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Categories
        </Heading>
        <FlatList
          horizontal={true}
          data={CATEGORIES_ARRAY}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate(CATEGORIES, { categoryName: item.title })
              }
            >
              <ImageBackground
                borderRadius={10}
                style={styles.categoryImgBg}
                resizeMode="cover"
                resizeMethod="resize"
                source={{ uri: item.uri }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 10,
                  }}
                >
                  <Heading
                    top="100"
                    padding={"2"}
                    color="white"
                    fontWeight="medium"
                    size="xs"
                  >
                    {item.title}
                  </Heading>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView style={styles.trendingContainer}>
        <Heading
          mt="1"
          mb="2"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Trending
        </Heading>
        {trendingPhotos ? <Masonry images={trendingPhotos} /> : <Spinner />}
      </ScrollView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {},
  searchBarContainer: {
    height: 250,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  categoriesContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  categoryImgBg: {
    width: "100%",
    height: "100%",
  },
  trendingContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
