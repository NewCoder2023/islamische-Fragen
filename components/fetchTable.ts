import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function fetchDate(table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [items, SetItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from(table)
        .select()
        .order("id", { ascending: true });

      // Error checking

      if (error) {
        setFetchError(
          "Elemente konnten nicht geladen werden.\n Überprüfen Sie bitte Ihre Internet Verbindung!"
        );
        SetItems([]);
      }

      if (data) {
        SetItems(data);
        setFetchError("");
      }
    };

    fetchItems();
  }, [table]);
  return {
    fetchError,
    items,
    table,
  };
}
