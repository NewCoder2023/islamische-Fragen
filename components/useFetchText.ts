import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface Answer {
  marja: string;
  answer: string;
  name: string;
}
export default function useFetchText(id: string, table: string) {
  const [fetchError, setFetchError] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [singleAnswer, setSingleAnswer] = useState<string>("");
  const [headerTitle, setHeaderTitle] = useState<string>("");

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
        setQuestion("");
        setAnswers([]);
      }

      if (data) {
        const newAnswers: Answer[] = [];

        // Check if category has two answers

        if (data.answer_khamenei) {
          newAnswers.push({
            marja: "Sayid al-Khamenei (h)",
            answer: data.answer_khamenei,
            name: "khamenei",
          });
        }

        if (data.answer_sistani) {
          newAnswers.push({
            marja: "Sayid as-Sistani (h)",
            answer: data.answer_sistani,
            name: "sistani",
          });
        }
        setAnswers(newAnswers);

        // Check if the category has just one answer
        if (data.answer) {
          setSingleAnswer(data.answer);
        }

        setHeaderTitle(data.title);
        setQuestion(data.question || "");
        setFetchError("");
      }
    };

    fetchItems();
  }, [id, table]);
  return {
    headerTitle,
    fetchError,
    answers,
    question,
    singleAnswer,
  };
}
