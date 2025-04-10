import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const products = [
  {
    id: "1",
    name: "Apple iPhone 14",
    price: "$799",
    description: "Smartphone by Apple",
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    price: "$699",
    description: "Flagship phone by Samsung",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    price: "$400",
    description: "Noise-canceling headphones",
  },
];

const Index = () => {
  const [data, setData] = useState(products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const addProduct = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Error", "Please enter Product Name and Price.");
      return;
    }

    setData([
      ...data,
      { id: String(data.length + 1), name, price: `$${price}`, description },
    ]);
    setFormVisible(false);
    setName("");
    setPrice("");
    setDescription("");
  };

  const deleteProduct = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Product Management App</Text>
          <Pressable
            onPress={() => setFormVisible(true)}
            style={styles.addIcon}
          >
            <Text style={styles.addIconText}>+</Text>
          </Pressable>
        </View>

        {/* Product List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Pressable onPress={(() => deleteProduct(item.id))} style={styles.deleteButton}>
                <Text style={styles.deleteIcon}>✖</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>This list is Empty.</Text>
          }
        />

        {/* Modal Form */}
        <Modal
          visible={formVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFormVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.formTitle}>Add Product</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Product Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Product Description"
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setFormVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.addButton} onPress={addProduct}>
                  <Text style={styles.addButtonText}>Add Product</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },

  addIcon: {
    backgroundColor: "#000",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addIconText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    fontSize: 16,
    color: "green",
  },

  description: {
    fontSize: 14,
    color: "#666",
  },

  deleteButton: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },

  deleteIcon: {
    fontSize: 20,
    fontWeight: 600,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },

  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  addButton: {
    flex: 1,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },

  addButtonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },

  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10,
  },

  cancelButtonText: {
    color: "black",
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Index;
