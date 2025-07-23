import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TimerForm = ({ id, title, project, onFormSubmit, onFormClose }) => {
  const [timerTitle, setTimerTitle] = useState(title || '');
  const [timerProject, setTimerProject] = useState(project || '');

  const handleSubmit = () => {
    onFormSubmit({
      id,
      title: timerTitle,
      project: timerProject,
    });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={timerTitle}
        onChangeText={setTimerTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        value={timerProject}
        onChangeText={setTimerProject}
      />
      <View style={styles.buttonGroup}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onFormClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimerForm;
