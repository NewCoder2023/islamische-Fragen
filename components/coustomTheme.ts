import Colors from "constants/Colors";


export const lightTheme = {
  container: {
    backgroundColor: Colors.light.white,
  },
  text: {
    color: Colors.light.text,
  },
  error: {
    color: Colors.light.error,
  },
  button: {
    color: Colors.light.adButton,
  },
};

export const darkTheme = {
  container: {
    backgroundColor: Colors.dark.contrast,
  },
  text: {
    color: Colors.dark.text,
  },
  error: {
    color: Colors.dark.error,
  },
  button: {
    color: Colors.dark.adButton,
  },
};

type ColorScheme = "light" | "dark" | undefined | null;

export const coustomTheme = (colorScheme: ColorScheme) => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
