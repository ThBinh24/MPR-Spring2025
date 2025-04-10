import { useState, useEffect } from "react";
import {
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks", error);
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTaskList(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (task.trim() !== "") {
      setLoading(true);
      const newTasks = [{ id: Date.now(), text: task, completed: false }, ...taskList];
      setTaskList(newTasks);
      await saveTasks(newTasks);
      setTask("");
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const updatedTasks = taskList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
    await saveTasks(updatedTasks); 
  };

  const deleteTask = async (id) => {
    setLoading(true);
    const filteredTasks = taskList.filter((task) => task.id !== id);
    setTaskList(filteredTasks);
    await saveTasks(filteredTasks); 
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Task" color="#007BFF" onPress={addTask} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                <Text style={[styles.task, item.completed && styles.completedTask]}>
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF01",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
    textAlign: "center",
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 3,
    overflow: "hidden",
  },
  list: {
    marginTop: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 20,
  },
  task: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 14,
  },
});
