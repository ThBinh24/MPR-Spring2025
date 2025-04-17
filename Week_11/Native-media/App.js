// import * as ImagePicker from "expo-image-picker";
// import * as ImageManipulator from "expo-image-manipulator";
// import { StatusBar } from "expo-status-bar";
// import { useState } from "react";
// import { StyleSheet, Button, View, Image } from "react-native";

// export default function App() {
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert('Permission to access the gallery is required!');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const rotateImage = async () => {
//     if (!image) return;
//     try {
//       const result = await ImageManipulator.manipulateAsync(
//         image,
//         [{ rotate: 90 }],
//         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
//       );
//       setImage(result.uri);
//     } catch (error) {
//       alert('Failed to rotate the image.');
//     }
//   };

//   const cropImage = async () => {
//     if (!image) {
//       return;
//     }
//     try {
//       const result = await ImageManipulator.manipulateAsync(
//         image,
//         [
//           {
//             crop: {
//               originX: 80,
//               originY: 80,
//               width: 80,
//               height: 80,
//             },
//           },
//         ],
//         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
//       );
//       setImage(result.uri);
//     } catch (error) {
//       alert('Failed to crop the image.');
//     }
//   };

//   const resizeImage = async () => {
//     if (!image) return;
//     try {
//       const result = await ImageManipulator.manipulateAsync(
//         image,
//         [
//           {
//             resize: {
//               width: 50,
//               height: 50,
//             },
//           },
//         ],
//         { compress: 1, format: ImageManipulator.SaveFormat.PNG }
//       );
//       setImage(result.uri);
//     } catch (error) {
//       alert('Failed to resize the image.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar />
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image ? (
//         <>
//           <Image source={{ uri: image }} style={styles.image} />
//           <View style={styles.buttonContainer}>
//             <Button title="Rotate" onPress={rotateImage} />
//             <Button title="Crop" onPress={cropImage} />
//             <Button title="Resize" onPress={resizeImage} />
//           </View>
//         </>
//       ) : null}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 250,
//     height: 250,
//     margin: 20,
//     resizeMode: "contain",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 20,
//     marginTop: 10,
//   },
// });


import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [status, setStatus] = useState({});

  // Toggle play/pause
  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={setStatus}
      />

      <Button
        title={status.isPlaying ? 'Pause' : 'Play'}
        onPress={handlePlayPause}
      />

      {/* Bonus: Progress bar */}
      {status.positionMillis != null && (
        <Text style={styles.progress}>
          {formatTime(status.positionMillis)} / {formatTime(status.durationMillis)}
        </Text>
      )}
    </View>
  );
}

// Convert milliseconds to mm:ss
const formatTime = (millis) => {
  if (!millis) return '0:00';
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 320,
    height: 200,
    backgroundColor: '#000',
  },
  progress: {
    marginTop: 10,
    fontSize: 16,
  },
});