import React from 'react'
import {  Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'

function DetailScreen({route, navigation}) {
    const {movie} = route.params;

  return (
    <View style={styles.container}>
        <Image source={movie.image} style={styles.image}/>
        <View style={styles.infoContainer}>
             <Text style={styles.title}>{movie.title}</Text>
             <Text style={styles.info}>{movie.genre} • {movie.year} • ⭐ {movie.rating}</Text>
             <Text style={styles.description}>{movie.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#212838'},
    image: {width: '95%', alignSelf: "center", height: 250, borderRadius: 10, marginTop: 20},
    infoContainer: { padding: 15 },
    title: {fontSize: 25, marginBottom: 10, color: '#fff', fontWeight: "800"},
    info: {fontSize: 15, marginBottom: 10, color: 'grey'},
    backButton: {backgroundColor: '#D92725', width: '95%', alignSelf: 'center', borderRadius: 8, marginTop: 20},
    backButtonText: {alignSelf: 'center', marginTop: 10, marginBottom: 10, color: 'white'},
    description: {color: '#888F95', fontSize: 15, marginTop: 10}
})

export default DetailScreen
