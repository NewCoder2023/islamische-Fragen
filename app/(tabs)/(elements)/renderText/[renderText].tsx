import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import fetchText from "components/fetchText";
import { FlatList } from "react-native";
import Colors from "constants/Colors";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function renderText() {
  const [isFavourite, setIsFavourite] = useState(false);

  const { id, table, title } = useLocalSearchParams<{
    id: string;
    table: string;
    title: string;
  }>();

  const { text, fetchError } = fetchText(id, table);

  const Separator = () => {
    return <View style={styles.separator} />;
  };
  const items = text.split("\n").filter((item) => item !== "");

  const favourite = () => {
    if (isFavourite) {
      setIsFavourite(!isFavourite);
      Toast.show({
        type: "error",
        text1: "Von Favoriten entfernt!",
      });
    } else {
      setIsFavourite(!isFavourite);
      Toast.show({
        type: "success",
        text1: "Zu Favoriten hinzugefügt!",
      });
    }
  };
  return (
    <View style={styles.container}>
      {/* Change header Title */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={favourite}>
              {isFavourite ? (
                <AntDesign name='star' size={24} color={Colors.light.star} />
              ) : (
                <AntDesign name='staro' size={24} color={Colors.light.star} />
              )}
            </Pressable>
          ),

          headerTitle: title,
        }}
      />
      {items && (
        <View style={styles.listContainer}>
          <FlatList
            data={items}
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
      )}
      {fetchError && (
        <View style={styles.renderError}>
          <Text style={styles.errorText}>{fetchError}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  listContainer: {},
  itemContainer: {
    flex: 1,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
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
  separator: {
    height: 2,
    backgroundColor: Colors.light.sperator,
  },
  renderError: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    color: Colors.light.error,
    textAlign: "center",
  },
});
