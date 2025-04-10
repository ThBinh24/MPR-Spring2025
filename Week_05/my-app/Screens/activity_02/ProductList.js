import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";

export default function ProductList({ navigation }) {
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

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProduct((prev) => [
        ...prev,
        { ...newProduct, id: Math.random().toString() },
      ]);
      setNewProduct({ name: "", price: "", description: "" });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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

      {/* form  */}
      <View style={styles.form}>
        <TextInput
          value={newProduct.name}
          placeholder="Enter product name..."
          style={styles.input}
          onChangeText={(text) => {
            setNewProduct((prev) => ({ ...prev, name: text }));
          }}
        />
        <TextInput
          value={newProduct.price}
          placeholder="Enter product price..."
          style={styles.input}
          onChangeText={(text) => {
            setNewProduct((prev) => ({ ...prev, price: text }));
          }}
        />
        <TextInput
          value={newProduct.description}
          placeholder="Enter product description..."
          style={styles.input}
          onChangeText={(text) => {
            setNewProduct((prev) => ({ ...prev, description: text }));
          }}
        />
        <Pressable style={styles.addButton} onPress={addProduct}>
          <Text style={{ color: "white" }}>Add Product</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    marginBottom: 20,
    fontSize: 24,
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
    fontSize: 16,
    fontWeight: "bold",
  },

  productPrice: {
    color: "green",
  },

  form: { marginTop: 16 },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 8,
    padding: 10,
    marginHorizontal: 10
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
    marginHorizontal: 5
  },
});

