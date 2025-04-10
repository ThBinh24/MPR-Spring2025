import { Text, View } from "react-native";

function ShopScreen() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "800", fontSize: 30 }}>Shop Screen</Text>
    </View>
  );
}

export default ShopScreen;
