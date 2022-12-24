import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";
/*Tengo un problema con los segundos, el segundero no cambia al empezar, eso está por corregír, a demás de eso algunos detalles responsive y listo, sería todo
 */
const App = () => {
  const [clicks, setClicks] = useState(0);
  const [mode, setMode] = useState(5);
  const [time, setTime] = useState(5000);
  const [isActive, setIsActive] = useState(false);
  const [timeId, setTimeId] = useState(0);
  const [toggleRest, setToggleRest] = useState(false);
  const [cente, setCente] = useState(false);
  let counter = 0;
  const showPoint = () =>
    Alert.alert("Puntaje", `${clicks}`, [
      {
        text: "ok",
        style: "cancel",
      },
    ]);

  useEffect(() => {
    let runningTimer = null;

    if (isActive) {
      if (time == mode * 1000) {
        setTime((time) => time - 1000);
      }
      runningTimer = setInterval(() => {
        if (counter === 99) {
          counter = 0;
          setTime((time) => time - 1000);
        } else {
          counter++;
          setCente(counter);
        }
      }, 10);
      setTimeId(runningTimer);
    } else {
      clearInterval(timeId);
    }
  }, [isActive]);

  useEffect(() => {
    if (time == 0 && counter == 0) {
      counter = 0;
      setCente(counter);
      setIsActive(false);
      showPoint();
    }
  }, [time]);

  const clickStart = () => {
    if (!isActive && time > 0) {
      setIsActive(true);
      setToggleRest(true);
    }
    if (time > 0) {
      setClicks((clicks) => clicks + 1);
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
    const mil = parseInt((time % 1000) / 10);
    const sec = parseInt(time / 1000);

    return `${sec < 10 ? "0" + sec : sec}:${cente < 10 ? "0" + cente : cente}`;
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
      <Pressable
        activeOpacity={false}
        style={styles.customButtonTap}
        onPress={() => clickStart()}
      >
        <Text style={styles.buttonClickText}>Start</Text>
      </Pressable>

      {/*FooterControls */}
      <View style={styles.sectionContainer}>
        <View style={!toggleRest ? styles.timerContainer : styles.hidden}>
          <Pressable
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(5);
            }}
          >
            <Text style={styles.textButtonMode}>5s</Text>
          </Pressable>
          <Pressable
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(10);
            }}
          >
            <Text style={styles.textButtonMode}>10s</Text>
          </Pressable>
          <Pressable
            style={styles.buttonModeTime}
            onPress={() => {
              changeMode(30);
            }}
          >
            <Text style={styles.textButtonMode}>30s</Text>
          </Pressable>
        </View>

        {/*Rest Button */}
        <Pressable
          onPress={() => {
            restClicker(mode);
          }}
          activeOpacity={false}
          style={toggleRest ? styles.butonRest : styles.hidden}
        >
          <Text style={styles.title}>Rest</Text>
        </Pressable>
      </View>

      {/*background */}
      <Image
        source={require("./assets/images/col-1.png")}
        style={styles.image1}
      />
      <Image
        source={require("./assets/images/col-2.png")}
        style={styles.image2}
      />
    </View>
  );
};
const { Height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: Height,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#bc2632",
    gap: 15,
    // boxShadow: "inset 0 0 500px rgba(0, 0, 0, 0.2)",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
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
    fontSize: 42,
    color: "#360815",
    fontWeight: "700",
  },
  sectionContainer: {
    minHeight: 120,
    alignItems: "center",
    marginTop: 25,
  },

  timerContainer: {
    flexDirection: "row",
  },

  buttonModeTime: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "#360815",
    margin: 10,
  },

  textButtonMode: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    //   fontWeight: 600,
  },
  hidden: {
    display: "none",
  },

  image1: {
    width: 350,
    height: 350,
    position: "absolute",
    bottom: 0,
    right: -200,
    zIndex: -1,
  },

  image2: {
    width: 200,
    height: 250,
    position: "absolute",
    bottom: 0,
    left: -70,
    zIndex: -1,
  },

  butonRest: {
    width: 100,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#360815",
    borderRadius: 150,
  },
});

export default App;
