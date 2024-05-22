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
  background: {
    backgroundColor: Colors.light.background,
  },
  inverseText: {
    color: Colors.light.white,
  },
  categorieText: {
    color: "#50707C",
  },
  categorieBackground: {
    backgroundColor: "#A2D9EF",
  },
  border: {
    borderColor: "#FFFFFF",
  },
  borderIndex: {
    borderColor: "#000000",
  },
  backgroundIndex: {
    backgroundColor: "#41ACD2",
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
  background: {
    backgroundColor: Colors.dark.background,
  },
  inverseText: {
    color: Colors.dark.black,
  },
  categorieText: {
    color: "#000000",
  },
  categorieBackground: {
    backgroundColor: "#A2D9EF",
  },
  border: {
    borderColor: "#000000",
  },
  borderIndex: {
    borderColor: "#FFFFFF",
  },
  backgroundIndex: {
    backgroundColor: "#41ACD2",
  },
};

type ColorScheme = "light" | "dark" | undefined | null;

export const coustomTheme = (colorScheme: ColorScheme) => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
