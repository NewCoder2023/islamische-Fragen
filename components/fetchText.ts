import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface Answer {
  marja: string;
  answer: string;
  name: string
}
export default function fetchText(id: string, table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);


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

        setAnswers([]);
      }

      if (data) {
        setAnswers([
          { marja: 'Sayyid Ali-as-Sistani ', answer: data.answer_sistani || "", name: "sistani" },
          { marja: 'Sayyid Ali khamenei', answer: data.answer_khamenei || "", name: "khamenei" }
        ]);
        setFetchError("");
      }
    };

    fetchItems();
  }, [id, table]);
  return {
    fetchError,
    answers,
  };
}
