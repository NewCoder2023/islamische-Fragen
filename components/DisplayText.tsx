import { Text, View } from "components/Themed";
import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { Platform } from "react-native";
import Colors from "constants/Colors";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function DisplayText({ text }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={text}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item}</Text>
            <View style={styles.pageNumberContainer}>
              <Text style={styles.pageNumber}>{index + 1}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={Separator}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },

  itemContainer: {
    flex: 1,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        backgroundColor: "#fff",
      },
    }),
  },
  pageNumberContainer: {},
  text: {
    fontSize: 18,
    lineHeight: 30,
  },
  pageNumber: {
    paddingTop: 10,
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
  },
  separator: {},
});
