import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MedicinesScreen = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.text}>💊 Medicines Screen - Under Development 🚧</Text>
      </View>
  );
};

export default MedicinesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

