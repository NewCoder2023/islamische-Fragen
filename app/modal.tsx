import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { Text, View } from "components/Themed";
import { useState } from "react";
import Colors from "constants/Colors";
import { supabase } from "@/utils/supabase";
import Toast from "react-native-toast-message";

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  const [email, onChangeEmail] = useState("hadi@mail.de");
  const [password, onChangePassword] = useState("hadi@mail.de");
  const [errorMessage, setError] = useState<string>("");

  const login = async () => {
    // if (email === "") {
    //   setError("Bitte Email eingeben!");
    //   return;
    // }
    // if (password === "") {
    //   setError("Bitte Passwort eingeben!");
    //   return;
    // }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email oder Passwort falsch!");
      console.error("Error:", error.message);
      return;
    } else {
      Toast.show({
        type: "success",
        text1: "Login erfolgreich!",
      });
      console.log("Success", data);
    }
    router.replace("/adminDashboard");
  };

  return (
    <View style={styles.container}>
      {!isPresented && <Link href='../'>Dismiss</Link>}
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.emailInput}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='Email'
        />
        <TextInput
          style={styles.passwordInput}
          onChangeText={onChangePassword}
          value={password}
          placeholder='Password'
          secureTextEntry={true}
        />
        <Pressable style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    flexDirection: "column",
    gap: 20,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: Colors.light.white,
  },
  emailInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  passwordInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  loginButton: {
    alignSelf: "center",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.link,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 20,
    color: Colors.light.error,
  },
});
