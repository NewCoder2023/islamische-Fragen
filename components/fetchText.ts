import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchText(title: string, table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("title", title);

      // Error checking

      if (error) {
        setFetchError(
          "Elemente konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internet Verbindung!"
        );
        setText([]);
      }

      if (data) {
        setText(data);
        setFetchError("");
      }
    };

    fetchItems();
  }, [title, table]);
  return {
    fetchError,
    text,
  };
}
