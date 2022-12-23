import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [mode, setMode] = useState(5);
  const [time, setTime] = useState(5000);
  const [isActive, setIsActive] = useState(false);
  const [timeId, setTimeId] = useState(0);
  const [toggleRest, setToggleRest] = useState(false);

  useEffect(() => {
    let runningTimer = null;

    if (isActive) {
      runningTimer = setInterval(() => {
        setTime((time) => time - 10);
      }, 10);
      setTimeId(runningTimer);
    } else {
      clearInterval(timeId);
    }
  }, [isActive]);

  useEffect(() => {
    if (time == 0) {
      setIsActive(false);
    }
  }, [time]);

  const clickStart = () => {
    if (!isActive && time > 0) {
      setIsActive(true);
      setToggleRest(true);
    }
    if (time > 0) {
      setClicks(clicks + 1);
    }
  };

  const changeMode = (seg) => {
    setMode(seg);
    setTime(seg * 1000);
  };

  const restClicker = (seg) => {
    setTime(seg * 1000);
    setClicks(0);
    setToggleRest(false);
    setIsActive(false);
  };

  const showTime = (time) => {
    const sec = parseInt(time / 1000);
    const mil = parseInt((time % 1000) / 10);

    return `${sec < 10 ? "0" + sec : sec}:${mil < 10 ? "0" + mil : mil}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Midamos tu Velocidad</Text>
        <View style={!toggleRest ? styles.infoContainer : styles.hidden}>
          <Text style={styles.title}>
            Modo: {mode < 10 ? `0${mode}` : mode}:00
          </Text>
          {/* <Text style={styles.title}>Mejor Record</Text> */}
        </View>
        <View style={toggleRest ? styles.infoContainer : styles.hidden}>
          <Text style={styles.title}>Timer: {showTime(time)}s</Text>
          <Text style={styles.title}>{clicks}</Text>
        </View>
      </View>
      {/* Clicker button*/}
      <TouchableOpacity
        activeOpacity={false}
        style={styles.customButtonTap}
        onPress={() => clickStart()}
      >
        <Text style={styles.buttonClickText}>Start</Text>
      </TouchableOpacity>

      {/*FooterControls */}
      <View style={styles.sectionContainer}>
        <View style={!toggleRest ? styles.timerContainer : styles.hidden}>
          <TouchableOpacity
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(5);
            }}
          >
            <Text style={styles.textButtonMode}>5s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(10);
            }}
          >
            <Text style={styles.textButtonMode}>10s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(30);
            }}
          >
            <Text style={styles.textButtonMode}>30s</Text>
          </TouchableOpacity>
        </View>

        {/*Rest Button */}
        <TouchableOpacity
          onPress={() => {
            restClicker(mode);
          }}
          activeOpacity={false}
          style={toggleRest ? styles.infoContainer : styles.hidden}
        >
          <Text>Rest</Text>
        </TouchableOpacity>
      </View>

      {/*background */}
      <Image
        source={require("./assets/images/Recurso 5.png")}
        style={styles.image1}
      />
      <Image
        source={require("./assets/images/Recurso 6.png")}
        style={styles.image2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "100vh",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#bc2632",
    gap: 15,
    paddingVertical: "30px",
    // boxShadow: "inset 0 0 500px rgba(0, 0, 0, 0.2)",
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
    border: "solid 25px #f4b8b3",
    // boxShadow: " 0 0 14px 22px rgba(999, 999, 999, .15)",
    borderRadius: 150,
    backgroundColor: "#fad9d4",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonClickText: {
    fontSize: 36,
    fontWeight: 800,
    color: "#360815",
  },
  sectionContainer: {
    height: "10vh",
    minHeight: "15vh",
    alignItems: "center",
    justifyContent: "center",
  },

  timerContainer: {
    flexDirection: "row",
    gap: 20,
  },

  buttonModeTime: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "#360815",
  },

  textButtonMode: {
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
  },
  hidden: {
    display: "none",
  },

  image1: {
    width: 300,
    height: 300,
    position: "fixed",
    right: -190,
    bottom: 0,
    zIndex: -100,
  },

  image2: {
    width: 300,
    height: 350,
    position: "fixed",
    left: -130,
    bottom: -90,
    zIndex: -100,
  },
});

export default App;
