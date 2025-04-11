import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Button, View, Image } from "react-native";

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the gallery is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const rotateImage = async () => {
    if (!image) return;
    try {
      const result = await ImageManipulator.manipulateAsync(
        image,
        [{ rotate: 90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setImage(result.uri);
    } catch (error) {
      alert('Failed to rotate the image.');
    }
  };

  const cropImage = async () => {
    if (!image) {
      return;
    }
    try {
      const result = await ImageManipulator.manipulateAsync(
        image,
        [
          {
            crop: {
              originX: 80,
              originY: 80,
              width: 80,
              height: 80,
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setImage(result.uri);
    } catch (error) {
      alert('Failed to crop the image.');
    }
  };

  const resizeImage = async () => {
    if (!image) return;
    try {
      const result = await ImageManipulator.manipulateAsync(
        image,
        [
          {
            resize: {
              width: 50,
              height: 50,
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      setImage(result.uri);
    } catch (error) {
      alert('Failed to resize the image.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <Button title="Rotate" onPress={rotateImage} />
            <Button title="Crop" onPress={cropImage} />
            <Button title="Resize" onPress={resizeImage} />
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    margin: 20,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 10,
  },
});