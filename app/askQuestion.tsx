//dasboard-neu:
import { Keyboard, ScrollView, StyleSheet, TextInput } from "react-native";
import { View, Text } from "components/Themed";
import Colors from "constants/Colors";
import { TouchableWithoutFeedback } from "react-native";
import { Pressable } from "react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { coustomTheme } from "components/coustomTheme";
import { useState } from "react";

export default function adminDashboard() {
  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [marja, setMarja] = useState<string>("");
  const [validateEmail, setValidateEmail] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Submit button */}
        <Stack.Screen
          options={{
            headerTitle: "Neue Frage stellen",
            headerRight: () => (
              <View style={styles.headerButton}>
                <Pressable>
                  <Text style={styles.submitButtonText}>Senden</Text>
                </Pressable>
              </View>
            ),
          }}
        />
        <ScrollView contentContainerStyle={styles.contactContainer}>
          <TextInput
            style={[styles.input, styles.inputName]}
            onChangeText={setName}
            value={name}
            placeholder='Name (optional)'
            keyboardType='default'
          />
          <TextInput
            style={[styles.input, styles.inputFirstname]}
            onChangeText={setAge}
            value={age}
            placeholder='Alter (pflicht)'
            keyboardType='numeric'
          />
          <TextInput
            style={[styles.input, styles.inputEmail]}
            onChangeText={setEmail}
            value={email}
            placeholder='Email (pflicht)'
            keyboardType='email-address'
          />
          <TextInput
            style={[styles.input, styles.inputEmail]}
            onChangeText={setValidateEmail}
            value={validateEmail}
            placeholder='Email wiederholen (pflicht)'
            keyboardType='email-address'
          />
          <TextInput
            style={[styles.input, styles.inputMarja]}
            onChangeText={setMarja}
            value={marja}
            placeholder='Vorbild der Nachahmung (Marja) [nur bei Rechtsfragen]'
            keyboardType='default'
          />
          <TextInput
            style={[styles.input, styles.inputQuestion]}
            onChangeText={setQuestion}
            value={question}
            placeholder='Frage'
            multiline
            keyboardType='default'
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    backgroundColor: "transparent",
    marginRight: -5,
  },
  submitButtonText: {
    fontSize: 20,
    color: Colors.light.link,
  },
  contactContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  input: {
    marginHorizontal: 10,
    paddingHorizontal: 12,
    marginTop: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
  },
  inputName: {},
  inputFirstname: {},
  inputEmail: {},
  inputMarja: {},
  inputQuestion: {
    flex: 1,
    marginBottom: 50,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 15,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    textAlignVertical: "top",
    lineHeight: 30,
  },
});
