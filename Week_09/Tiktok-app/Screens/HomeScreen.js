import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
const screenHeight = Dimensions.get("window").height;

const mockData = [
  {
    id: "1",
    user: "john_doe",
    avatar: require("../assets/user.jpg"),
    image: require("../assets/posts01.jpg"),
    caption: "Amazing view! 🌅 #nature #learnOnTiktok",
    likes: 150,
    comments: 45,
  },
  {
    id: "2",
    user: "alice_wonder",
    avatar: require("../assets/posts02.jpg"),
    image: require("../assets/posts02.jpg"),
    caption: "City vibes! 🌆",
    likes: 98,
    comments: 30,
  },
  {
    id: "3",
    user: "mark_travel",
    avatar: require("../assets/posts02.jpg"),
    image: require("../assets/posts02.jpg"),
    caption: "Lost in the mountains! ⛰️",
    likes: 220,
    comments: 75,
  },
];
export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState("Following");

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={item.image} style={styles.postImage} />

      <View style={styles.rightIcons}>
        <Image source={item.avatar} style={styles.profileAvatar} />
        <Pressable>
          <Image source={require("../assets/heart.png")} style={styles.icon} />
          <Text style={styles.iconText}>{item.likes}</Text>
        </Pressable>
        <Pressable>
          <Image
            source={require("../assets/comment.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>{item.comments}</Text>
        </Pressable>
        <Pressable>
          <Image source={require("../assets/save.png")} style={styles.icon} />
        </Pressable>
        <Pressable>
          <Image source={require("../assets/share.png")} style={styles.icon} />
        </Pressable>
      </View>

      <View style={styles.bottomInfo}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* 3 Tabs */}
        <View style={styles.tabContainer}>
          {["Friends", "Following", "For You"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeText,
                ]}
              >
                {tab}
              </Text>
              {selectedTab === tab && <View style={styles.underline} />}
            </Pressable>
          ))}
        </View>

        {/* Search Icon */}
        <Pressable style={styles.searchButton}>
          <Image
            source={require("../assets/search.png")}
            style={styles.searchIcon}
          />
        </Pressable>
      </View>

      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1616",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "relative",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    marginHorizontal: 20,
    marginBottom: 5,
    alignItems: "center",
  },
  tabText: {
    fontSize: 20,
    color: "#bbb",
  },
  activeText: {
    fontWeight: "bold",
    color: "#fff",
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: "#1e90ff",
    marginTop: 4,
    borderRadius: 2,
  },
  searchButton: {
    position: "absolute",
    right: 40,
    bottom: 20,
  },
  searchIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "#fff",
  },
  postContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height:  screenHeight * 0.855,
  },
  postImage: {
    width: "100%", 
    height: "100%",
    resizeMode: "cover",
    alignSelf: "center",
  },

  rightIcons: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: "#fff",
    marginBottom: 15,
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },

  bottomInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  userName: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  caption: {
    color: "#ddd",
    fontSize: 20,
  },
});