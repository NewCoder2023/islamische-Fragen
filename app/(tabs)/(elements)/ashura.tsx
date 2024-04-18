import { View, Text } from "components/Themed";
import React from "react";
import Colors from "constants/Colors";
import RenderItems from "components/RenderItems";
import { StyleSheet } from "react-native";
import fetchItems from "components/fetchTable";

export default function ashura() {
  const { items, fetchError } = fetchItems("Ashura");
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.informationTextContainer}>
          <Text style={styles.informationText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur adipisci ipsum modi facere dolorem dignissimos quam
            assumenda explicabo, unde earum perferendis voluptatum beatae iure?
            Praesentium perspiciatis ea quod animi iste.
          </Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <RenderItems categoryItems={items} error={fetchError} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.2,
  },
  itemContainer: {
    flex: 0.8,
  },
  informationTextContainer: {
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
  FlatListItems: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
  },
  renderItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderWidth: 0.2,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemIcon: {},
});
