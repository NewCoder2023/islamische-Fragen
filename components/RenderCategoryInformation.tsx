import { View, Text } from "components/Themed";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "constants/Colors";

interface RenderCategoryInformationProps {
  category: string;
}
export default function RenderCategoryInformation({
  category,
}: RenderCategoryInformationProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.informationText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        adipisci ipsum modi facere dolorem dignissimos quam assumenda explicabo,
        unde earum perferendis voluptatum beatae iure? Praesentium perspiciatis
        ea quod animi iste.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.white,
  },
  informationText: {},
  mainContainer: {
    flex: 0.8,
    marginTop: 10,
    marginBottom: 10,
  },
});
