import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";

const App = () => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning) {
            return { ...timer, elapsed: timer.elapsed + 1000 };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateFormSubmit = (timer) => {
    setTimers([
      ...timers,
      {
        id: Date.now().toString(),
        title: timer.title,
        project: timer.project,
        elapsed: 0,
        isRunning: false,
      },
    ]);
  };

  const toggleTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === timerId) {
          return {
            ...timer,
            isRunning: !timer.isRunning,
          };
        }
        return timer;
      })
    );
  };

  const updateTimer = (updatedTimer) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === updatedTimer.id) {
          return { ...timer, ...updatedTimer };
        }
        return timer;
      })
    );
  };

  const deleteTimer = (timerId) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.id !== timerId)
    );
  };

  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
        {timers.map(({ id, title, project, elapsed, isRunning }) => (
          <EditableTimer
            key={id}
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onStartPress={() => toggleTimer(id)}
            onStopPress={() => toggleTimer(id)}
            onDeletePress={() => deleteTimer(id)}
            onUpdatePress={updateTimer}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
  },
  timerList: {
    paddingBottom: 15,
  },
});

export default App;
