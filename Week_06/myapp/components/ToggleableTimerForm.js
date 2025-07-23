import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TimerForm from './TimerForm';

const ToggleableTimerForm = ({ onFormSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormOpen = () => {
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (timer) => {
    onFormSubmit(timer);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      {isOpen ? (
        <TimerForm onFormSubmit={handleFormSubmit} onFormClose={handleFormClose} />
      ) : (
        <Button title="+" onPress={handleFormOpen} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ToggleableTimerForm;
