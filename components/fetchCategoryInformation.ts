import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchCategoryInformation(table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [text, setText] = useState<string>("");

  // Encode title because () in title causes problems
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("CategoryInformation")
        .select("*")
        .eq("table", table)
        .single();

      // Error checking

      if (error) {
        setFetchError("Fehler, überprüfen Sie bitte Ihre Internet Verbindung!");

        setText("");
      }

      if (data) {
        setText(data.information);
        setFetchError("");
      }
    };

    fetchItems();
  }, [table]);
  return {
    fetchError,
    text,
  };
}
