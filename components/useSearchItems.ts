import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Table {
  tableName: string;
}

interface SearchResult {
  table: string;
  items: any[];
}

const fetchAllTables =  async (): Promise<Table[]> => {
  try {
    const { data, error } = await supabase.from("AllQuestions").select("tableName");
    if (error) {
      throw new Error(`Error fetching tables: ${error.message}`);
    }
    return data;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};


const searchInTables = async (search: string): Promise<SearchResult[]> => {
  const tables = await fetchAllTables();
  
  const results = await Promise.all(
    tables.map(async (table) => {
      const { data, error } = await supabase
        .from(table.tableName)
        .select("*")
        .ilike("title", `%${search}%`);

      if (error) {
        console.error(`Error searching in ${table.tableName}:`, error.message);
        return null;
      }

      if (data && data.length > 0) {
        return {
          table: table.tableName,
          items: data,
        };
      }
      return null;
    })
  );

  return results.filter((result): result is SearchResult  => result !== null);
};

export default function useSearchItems(search: string) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    const searchTables = async () => {
      const results = await searchInTables(search);
      setSearchResults(results);
      setIsLoading(false);
    };

    setIsLoading(true);
    searchTables();
  }, [search]);
  return { searchResults, isLoading };
}
