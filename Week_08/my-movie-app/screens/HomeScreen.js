import React from "react";
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const movie = [
  {
    id: 1,
    title: "Avatar 2: The way of Water",
    year: 2022,
    rating: 8.1,
    genre: "Sci-Fi",
    description: "Set more than a decade after the events of the first film, Avatar: The Way of Water follows Jake Sully and Neytiri as they build a family and face new challenges on Pandora. When humanity returns with advanced technology to colonize the planet once again, they must unite with the Na'vi clans and explore uncharted underwater regions to protect their home. The film delves into themes of family, survival, and the deep connection between the Na'vi and their environment.",
    image: require("../assets/avatar.jpg"),
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 8.4,
    genre: "Action",
    description: "After the devastating events of Avengers: Infinity War, where Thanos wiped out half of all life in the universe, the remaining Avengers must regroup and devise a plan to reverse his actions. Tony Stark, Captain America, Thor, and the team embark on a time-traveling mission through the Quantum Realm, revisiting key moments from their past to collect the Infinity Stones. Facing emotional sacrifices and epic battles, they fight to restore balance and save humanity in this climactic conclusion to the Marvel saga.",
    image: require("../assets/spiderman.jpg"),
  },
  {
    id: 3,
    title: "The Batman",
    year: 2022,
    rating: 7.9,
    genre: "Crime",
    description: "In his second year as Gotham's vigilante, Bruce Wayne, aka Batman, investigates a series of brutal murders tied to the enigmatic Riddler. As he uncovers a web of corruption linking Gotham's elite to the criminal underworld, Batman must forge uneasy alliances with Selina Kyle (Catwoman) and Lt. James Gordon. This dark, gritty reboot explores Batman's detective skills, psychological depth, and relentless pursuit of justice in a city teetering on the edge of chaos.",
    image: require("../assets/batman.jpg"),
  },
  {
    id: 4,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Thriller",
    description: "Dom Cobb is a master thief with a rare ability: infiltrating dreams to extract valuable secrets from the subconscious. Hired for an almost impossible job-to plant an idea, or 'inception,' into a target's mind-Cobb assembles a skilled team and dives into layers of dreams within dreams. As reality and illusion blur, they face mind-bending challenges, time distortions, and personal demons, all while questioning the nature of reality in this cerebral sci-fi thriller directed by Christopher Nolan.",
    image: require("../assets/inception.jpg"),
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Sci-Fi",
    description: "In a future where Earth is becoming uninhabitable due to environmental collapse, ex-NASA pilot Cooper leads a team of astronauts on a desperate mission to find a new planet for humanity. Traveling through a wormhole near Saturn, they explore distant galaxies, encountering black holes, time dilation, and hostile worlds. Intertwined with a father-daughter story, the film examines love, sacrifice, and the survival of the human race, blending hard science with emotional depth under Christopher Nolan's direction.",
    image: require("../assets/interstellar.jpg"),
  },
];

const HomeScreen = ({ navigation }) => {
  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => navigation.navigate("Movie Detail", { movie: item })}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>
            📅 {item.year} | 🚀 {item.genre}
          </Text>
          <Text style={styles.rating}>⭐ {item.rating} / 10</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movie}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#212838" },
  movieItem: { flexDirection: "row", padding: 10 },
  movieInfo: { flex: 1 },
  image: { width: 100, height: 150, marginRight: 20 },
  title: { color: "white", fontSize: 20, fontWeight: "800", marginBottom: 20 },
  info: { color: "gray", fontSize: 14, marginBottom: 10 },
  rating: { color: "#FDE82D" },
});

export default HomeScreen;
