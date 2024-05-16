import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface imageCounterProps {
  displayImageCounter: string[];
}

const ImageCount = ({ displayImageCounter }: imageCounterProps) => {
  return (
    <View style={styles.ImageContainerFooter}>
      {displayImageCounter.map((icon, index) => (
        <Text key={index.toString()} style={styles.ImageContainerFooterIcons}>
          {icon}
        </Text>
      ))}
    </View>
  );
};

export default ImageCount;

const styles = StyleSheet.create({
  ImageContainerFooter: {
    marginTop: 15,
    padding: 5,
    flexDirection: "row",
    borderRadius: 30,
  },
  ImageContainerFooterIcons: {
    padding: 5,
  },
});
