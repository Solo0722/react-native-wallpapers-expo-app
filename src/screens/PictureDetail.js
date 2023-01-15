import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Button, Icon, IconButton, Menu, Spinner, useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { client } from "../helpers/pexelClient";
import { Feather } from "@expo/vector-icons";
import { GlobalContext } from "../context/context";
import WallPaperManager from "react-native-set-wallpaper";

const PictureDetail = ({ navigation, route }) => {
  const { imageId } = route.params;
  const [photo, setPhoto] = React.useState(null);
  const toast = useToast();

  // let filteredDownloads = downloadedPhotos.filter((ph) => ph.id === photo.id);
  // let filteredFavorites = favoritePhotos.filter((ph) => ph.id === photo.id);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPhoto = async () => {
        try {
          await client.photos.show({ id: imageId }).then((photo) => {
            setPhoto(photo);
            navigation.setOptions({
              headerRight: () => {
                return (
                  <IconButton
                    mr={"5"}
                    variant={"ghost"}
                    icon={<Icon as={Feather} name="heart" />}
                    onPress={addToFavorites}
                  />
                );
              },
            });
          });
        } catch (e) {
          console.log(e);
        }
      };

      fetchPhoto();
    }, [])
  );

  const downloadImage = () => {
    // if (filteredDownloads.length === 0) {
    //   setDownloadedPhotos([...downloadedPhotos, photo]);
    // }
  };

  const setImageAsWallpaper = (type) => {
    return null;
  };

  const addToFavorites = () => {
    // if (filteredFavorites === 0) {
    //   setFavoritePhotos([...favoritePhotos, photo]);
    // }
  };

  return (
    <View style={styles.imageContainer}>
      {!photo ? (
        <Spinner />
      ) : (
        <ImageBackground
          style={styles.imgBg}
          resizeMode="cover"
          resizeMethod="resize"
          source={{ uri: photo.src.original }}
        >
          {photo &&
            ([].length === 0 ? (
              <Button
                borderRadius={20}
                bottom={"16"}
                width={"90%"}
                onPress={downloadImage}
              >
                Download
              </Button>
            ) : (
              <Menu
                shadow={2}
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Button
                      borderRadius={20}
                      bottom={"16"}
                      width={"90%"}
                      {...triggerProps}
                    >
                      Set as wallpaper
                    </Button>
                  );
                }}
              >
                <Menu.Item onPress={() => setImageAsWallpaper("home")}>
                  Home screen
                </Menu.Item>
                <Menu.Item onPress={() => setImageAsWallpaper("lock")}>
                  Lock screen
                </Menu.Item>
                <Menu.Item onPress={() => setImageAsWallpaper("both")}>
                  Both
                </Menu.Item>
              </Menu>
            ))}
        </ImageBackground>
      )}
    </View>
  );
};

export default PictureDetail;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgBg: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
