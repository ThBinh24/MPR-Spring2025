import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { millisecondsToHuman } from '../utils/timeUtils';

const Timer = ({ title, project, elapsed, isRunning, onStartPress, onStopPress }) => {
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text>{project}</Text>
      <Text>{millisecondsToHuman(elapsed)}</Text>
      <Button title={isRunning ? 'Stop' : 'Start'} onPress={isRunning ? onStopPress : onStartPress} />
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
});

export default Timer;
