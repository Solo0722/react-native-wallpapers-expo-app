import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Spinner } from "native-base";
import Masonry from "../components/Masonry";
import { client } from "../helpers/pexelClient";

const Categories = ({ navigation, route }) => {
  const { categoryName } = route.params;
  console.log(categoryName);

  const [categoryPhotos, setCategoryPhotos] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCategoryPhotos = async () => {
        try {
          await client.photos.search({ query: categoryName }).then((photos) => {
            setCategoryPhotos(photos.photos);
            navigation.setOptions({
              title: `${categoryName
                .slice(0, 1)
                .toUpperCase()}${categoryName.slice(1)}`,
            });
          });
        } catch (e) {
          console.log(e);
        }
      };

      fetchCategoryPhotos();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {categoryPhotos ? <Masonry images={categoryPhotos} /> : <Spinner />}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 100,
    paddingHorizontal: 10,
  },
});
