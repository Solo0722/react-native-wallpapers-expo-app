import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import MasonryList from "@react-native-seoul/masonry-list";
import { Image, Spinner } from "native-base";
import { PICTUREDETAIL } from "../constants/routeNames";
import { useNavigation } from "@react-navigation/native";

const Masonry = ({ images }) => {
  const navigation = useNavigation();
  let page = 2;

  const ImageCard = ({ item, style }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);

    return (
      <TouchableOpacity
        key={item.id}
        style={[{ marginTop: 12, flex: 1 }, style]}
        onPress={() => navigation.navigate(PICTUREDETAIL, { imageId: item.id })}
      >
        <Image
          fallbackSource={{
            uri: "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
          }}
          defaultSource={{
            uri: "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
          }}
          source={{
            uri:
              item.src.original ||
              "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
          }}
          alt="pexel-img"
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: "stretch",
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, i }) => {
    return (
      <ImageCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 6 }} />
    );
  };

  const onEndReached = () => {
    React.useCallback(() => {
      const fetchTrendingPhotos = async () => {
        try {
          await client.photos.curated({ page: page }).then((photos) => {
            images = images.concat(photos.photos);
            page += 1;
          });
        } catch (e) {
          console.log(e);
        }
      };

      fetchTrendingPhotos();
    }, []);
  };

  return (
    <MasonryList
      data={images}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={<View />}
      ListFooterComponent={<View style={{ marginBottom: 30 }} />}
      ListEmptyComponent={
        <View style={{ marginTop: 30 }}>No wallpapers found!</View>
      }
      LoadingView={
        <View style={{ marginTop: 30 }}>
          <Spinner />
        </View>
      }
      contentContainerStyle={{
        alignSelf: "stretch",
      }}
      numColumns={2}
      // onEndReached={onEndReached}
    />
  );
};

export default Masonry;

const styles = StyleSheet.create({});
