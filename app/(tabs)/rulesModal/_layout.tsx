import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='modal'
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
