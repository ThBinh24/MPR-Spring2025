import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";

function ProductListScreen({ navigation }) {
  const [product, setProduct] = useState([
    {
      id: "1",
      name: "Apple iPhone 14",
      price: "799",
      description: "Smartphone by Apple",
    },
    {
      id: "2",
      name: "Samsung Galaxy S23",
      price: "699",
      description: "Flagship phone by Samsung",
    },
    {
      id: "3",
      name: "Sony WH-1000XM5",
      price: "399",
      description: "Noise-canceling headphones",
    },
  ]);

  const addNewProduct = (product) => {
    setProduct((prevProducts) => [...prevProducts, product]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Product List</Text>

        <FlatList
          data={product}
          keyExtractor={(data) => data.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.productItem}
              onPress={() =>
                navigation.navigate("Product Detail", { product: item })
              }
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* button  */}
      <Pressable
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("Product Add", { onAddProduct: addNewProduct })
        }
      >
        <Text style={{ color: "white", fontSize: 18 }}>Add new roduct</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },

  title: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  productItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
    borderRadius: 8,
  },

  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  productPrice: {
    color: "green",
    fontSize: 18
  },

  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 25,
  },
});

export default ProductListScreen;
