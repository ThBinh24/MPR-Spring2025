import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text
} from "react-native";

export default function ProductAddScreen({navigation, route}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const onAddProduct = route.params?.onAddProduct || (() => {});

  const handleAdd = () => {
    if (newProduct.name && newProduct.price) {
      const productWithId = { ...newProduct, id: Math.random().toString() };
  
      if (onAddProduct) {
        onAddProduct(productWithId);
      }
  
      navigation.goBack();
    }
  };
  

  return (
      <KeyboardAvoidingView>
        <View style={styles.form}>
          <TextInput
            value={newProduct.name}
            placeholder="Enter product name..."
            style={styles.input}
            onChangeText={(text) => {
              setNewProduct({ ...newProduct, name: text });
            }}
          />
          <TextInput
            value={newProduct.price}
            placeholder="Enter product price..."
            style={styles.input}
            onChangeText={(text) => {
              setNewProduct({ ...newProduct, price: text });
            }}
          />
          <TextInput
            value={newProduct.description}
            placeholder="Enter product description..."
            style={styles.input}
            onChangeText={(text) => {
              setNewProduct({ ...newProduct, description: text });
            }}
          />
          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={{ color: "white", fontSize: 18 }}>Add new product</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginHorizontal: 20
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 8,
    padding: 10,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 5,
  },
});

