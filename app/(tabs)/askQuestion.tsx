//dasboard-neu:
import { Keyboard, ScrollView, StyleSheet, TextInput } from "react-native";
import { View, Text, SafeAreaView } from "components/Themed";
import Colors from "constants/Colors";
import { TouchableWithoutFeedback } from "react-native";
import { Pressable } from "react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { coustomTheme } from "components/coustomTheme";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useSendQuestion } from "components/useSendQuestion";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface Email {
  name: string;
  age: number;
  email: string;
  marja: string;
  gender: string;
  question: string;
}
export default function adminDashboard() {
  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme(colorScheme);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validateEmail, setValidateEmail] = useState<string>("");
  const [marja, setMarja] = useState<string>("");
  const [gender, setgender] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");
  const { sendEmail } = useSendQuestion();

  const genderOptions = [
    { label: "Männlich", value: "Männlich" },
    { label: "Weiblich ", value: "Weiblich" },
  ];

  const handleCheckboxChange = (value: string) => {
    setgender(value);
  };

  const send = async () => {
    const success = await sendEmail(name, age, email, marja, gender, question);
    if (success) {
      Toast.show({
        type: "success",
        text1: "Frage erfolgreich gesendet!",
        text2: "Du erhälst die Antwort in wenigen Tagen als Email",
      });
      router.navigate("index");
    } else {
      Toast.show({
        type: "error",
        text1: "Fehler",
        text2: "Versuch es später erneut",
      });
    }
  };

  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Submit button */}
        <Stack.Screen
          options={{
            headerTitle: "Eine Frage stellen",
            headerRight: () => (
              <View style={styles.headerButton}>
                <Pressable onPress={() => send()}>
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
          <View style={styles.genderContainer}>
            {genderOptions.map((option) => (
              <View key={option.value} style={styles.gender}>
                <Checkbox
                  style={styles.genderCheckbox}
                  value={gender === option.value}
                  onValueChange={() => handleCheckboxChange(option.value)}
                />
                <Text style={styles.genderLable}>{option.label}</Text>
              </View>
            ))}
          </View>

          <TextInput
            style={[styles.input, styles.inputAge]}
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
            placeholder='Vorbild der Nachahmung (Marja)'
            keyboardType='default'
          />
          <TextInput
            style={[styles.input, styles.inputQuestion]}
            onChangeText={setQuestion}
            value={question}
            placeholder='Frage'
            multiline={true}
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
    marginRight: 20,
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
  genderContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  gender: {
    alignItems: "center",
  },
  genderLable: {
    marginTop: 5,
  },
  genderCheckbox: {
    borderRadius: 30,
  },
  inputAge: {},
  inputEmail: {},
  inputMarja: {},
  inputQuestion: {
    flex: 1,
    marginBottom: 50,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    lineHeight: 30,
  },
});
