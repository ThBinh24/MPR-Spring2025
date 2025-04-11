import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Button, View, Image } from "react-native";

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  // rotate 90 degree
  const rotateImage = async () => {
    if (!image) return;
    const result = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ rotate: 90 }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(result);
  };

  // crop with = 50, height = 20
  const cropImage = async () => {
    if (!image) return;
    const result = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ 
        crop:{
          originX: 80,
          originY: 80,
          width: 80,
          height:80,
        }
       }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(result);
  };

  // resize 30 x 30
  const resizeImage = async () => {
    if (!image) return;
    const result = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ 
        resize: {
          width:50,
          height:50
        }
       }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(result);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <Button title="Rotate" onPress={rotateImage} />
        <Button title="Crop" onPress={cropImage} />
        <Button title="resize" onPress={resizeImage} />
      </View>
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
    resizeMode: "contain"
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: "row",
    gap: 30,

  }
});
