import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Text, View } from "./Themed";
import RenderItems from "./RenderItems";

const fetchAllTables = async () => {
  const { data, error } = await supabase.from("AllTables").select("tableName");

  if (error) {
    console.error("Error fetching tables:", error.message);
    return [];
  }

  return data;
};

const ItemSearch = ({ search }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchTables = async () => {
      const tables = await fetchAllTables();

      const results = await Promise.all(
        tables.map(async (table) => {
          const { data, error } = await supabase
            .from(table)
            .select("*")
            .ilike("title", search);

          if (error) {
            console.error(
              `Error searching in ${table.tablename}:`,
              error.message
            );
            return null;
          }

          if (data && data.length > 0) {
            return {
              table: table.tablename,
              results: data,
            };
          }

          return null;
        })
      );

      const filteredResults = results.filter((result) => result !== null);

      setSearchResults(filteredResults);
      setIsLoading(false);
    };

    setSearchResults([]);
    setIsLoading(true);
    searchTables();
  }, [search]);

  if (isLoading) {
    return <Text>Lädt...</Text>;
  }

  if (searchResults.length === 0) {
    return <Text>Leider haben wir dazu noch nichts</Text>;
  }

  return (
    <View>
      {searchResults.map((result, index) => (
        <RenderItems
          items={result.results}
          fetchError={result.error}
          table={result.table}
        />
      ))}
    </View>
  );
};

export default ItemSearch;
