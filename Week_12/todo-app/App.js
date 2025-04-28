import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.125:5000';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [offlineQueue, setOfflineQueue] = useState([]);

  useEffect(() => {
    fetchTodos();
    syncOfflineTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/getTodos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!task) return;

    const newTodo = { task };
    try {
      const response = await axios.post(`${API_URL}/api/addTodo`, newTodo);
      setTodos([...todos, response.data]);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
      const updatedQueue = [...offlineQueue, newTodo];
      setOfflineQueue(updatedQueue);
      await AsyncStorage.setItem('offlineQueue', JSON.stringify(updatedQueue));
    }
  };


  const syncOfflineTodos = async () => {
    const queue = await AsyncStorage.getItem('offlineQueue');
    if (queue) {
      const todosToSync = JSON.parse(queue);
      for (const todo of todosToSync) {
        try {
          await axios.post(`${API_URL}api/addTodo`, todo);
        } catch (error) {
          console.error('Error syncing todo:', error);
        }
      }
      await AsyncStorage.removeItem('offlineQueue');
      setOfflineQueue([]);
      fetchTodos(); 
    }
  };

  useEffect(() => {
    const interval = setInterval(syncOfflineTodos, 10000);
    return () => clearInterval(interval);
  }, [offlineQueue]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.task}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 400, padding: 20},
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  todoItem: { padding: 10, borderBottomWidth: 1 },
});