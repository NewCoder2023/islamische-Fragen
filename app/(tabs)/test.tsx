import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { supabase } from "@/utils/supabase";

const App = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("test").select("content");

      if (error) {
        console.error("Error fetching posts", error);
        return;
      }

      setContent(data[0].content); // Assuming you are fetching one post
    }

    fetchData();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Markdown>{content}</Markdown>
    </View>
  );
};

export default App;
