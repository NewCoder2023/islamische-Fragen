import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchText(id: string, table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [text, setText] = useState<string>("");

  // Encode title because () in title causes problems
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

      // Error checking

      if (error) {
        setFetchError(
          "Elemente konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internet Verbindung!"
        );

        setText("");
      }

      if (data) {
        setText(data.content);
        setFetchError("");
      }
    };

    fetchItems();
  }, [id, table]);
  return {
    fetchError,
    text,
  };
}
