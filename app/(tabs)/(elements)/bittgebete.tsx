import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DisplayText from "components/DisplayText";

const text = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur?",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam laborum ducimus sequi est suscipit rerum unde, quae aperiam nesciunt, pariatur blanditiis deleniti esse saepe, odit rem. Aspernatur, quam consectetur?",
];

export default function bittgebete() {
  return (
    <View style={styles.container}>
      <DisplayText text={text} title='title' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
