import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MdOutlineRestartAlt } from "react-icons/md";

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [mode, setMode] = useState(5);
  const [time, setTime] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [timeId, setTimeId] = useState(0);

  useEffect(() => {
    let runningTimer = null;

    if (isActive) {
      runningTimer = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      setTimeId(runningTimer);
    } else {
      clearInterval(timeId);
    }
  }, [isActive]);

  useEffect(() => {
    if (time == 0) {
      alert("Tu puntaje fue de " + clicks);
      setIsActive(false);
    }
  }, [time]);

  const clickStart = () => {
    if (!isActive && time > 0) {
      setIsActive(true);
    }
    if (isActive) {
      setClicks(clicks + 1);
    }
  };

  const changeMode = (seg) => {
    setMode(seg);
    setTime(seg);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Midamos tu Velocidad</Text>
      <View style={styles.infoContainer}>
        <Text>Modo: {mode}s</Text>
        <Text>Mejor Record</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Timer{time}s</Text>
        <Text style={styles.title}>{clicks}</Text>
      </View>
      {/* <Button
        color="red"
        title="Click prro"
        onPress={() => {
          Alert.alert("Eres grande no te rindas y mide tu furia.");
        }}
      /> */}
      <TouchableOpacity
        style={styles.customButtonTap}
        onPress={() => clickStart()}
      >
        <Text>Start</Text>
      </TouchableOpacity>

      <View style={!isActive ? styles.timerContainer : styles.hidden}>
        <TouchableOpacity
          style={styles.buttonModeTime}
          onPress={() => {
            changeMode(5);
          }}
        >
          <Text>5s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonModeTime}
          onPress={() => {
            changeMode(10);
          }}
        >
          <Text>10s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonModeTime}
          onPress={() => {
            changeMode(30);
          }}
        >
          <Text>30s</Text>
        </TouchableOpacity>
      </View>
      <View style={isActive ? styles.container : styles.hidden}>
        <MdOutlineRestartAlt size="50px" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "darkgrey",
    gap: 15,
    paddingVertical: "30px",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: "28px", color: "white" },
  img: { height: "200px", width: "200px" },
  customButtonTap: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  timerContainer: {
    flexDirection: "row",
    gap: 20,
  },

  buttonModeTime: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "lightblue",
  },
  hidden: {
    display: "none",
  },
});

export default App;
