import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  name: { fontSize: 30, fontWeight: "bold", marginBottom: 40 },
  price: { fontSize: 20, color: "green", marginBottom: 5 },
  description: { fontSize: 20 },
});

