import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchText(id: string, table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [content, setContent] = useState<any[]>([]);

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

        setContent([]);
      }

      if (data) {
        setContent(data.content);
        setFetchError("");
      }
    };

    fetchItems();
  }, [id, table]);
  return {
    fetchError,
    content,
  };
}
