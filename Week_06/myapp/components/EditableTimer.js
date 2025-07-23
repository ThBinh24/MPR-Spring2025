import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { millisecondsToHuman } from '../utils/timeUtils';

const EditableTimer = ({ id, title, project, elapsed, isRunning, onStartPress, onStopPress, onDeletePress, onUpdatePress }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newProject, setNewProject] = useState(project);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    onUpdatePress({ id, title: newTitle, project: newProject });
    setIsEditing(false);
  };

  return (
    <View style={styles.timerContainer}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.textInput}
            value={newTitle}
            onChangeText={setNewTitle}
          />
          <TextInput
            style={styles.textInput}
            value={newProject}
            onChangeText={setNewProject}
          />
          <Button title="Save" onPress={handleSavePress} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text>{project}</Text>
          <Text>{millisecondsToHuman(elapsed)}</Text>
          <Button
            title={isRunning ? 'Stop' : 'Start'}
            onPress={isRunning ? onStopPress : onStartPress}
          />
          <Button title="Edit" onPress={handleEditPress} />
          <Button title="Delete" onPress={onDeletePress} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default EditableTimer;
