import { Text, View } from "react-native";

function ProfileScreen() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "800", fontSize: 30 }}>Profile Screen</Text>
    </View>
  );
}

export default ProfileScreen;
