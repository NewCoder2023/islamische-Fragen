import { supabase } from "@/utils/supabase";

export default function getPublicImageUrl(fileName) {
  const { publicUrl, error } = supabase.storage
    .from("news_bucket")
    .getPublicUrl(`images/csm_kw18-blog-elkemueller_59e2437738.jpg`);

  if (error) {
    console.error("Fehler beim Abrufen der Bild-URL:", error);
    return null;
  } else {
    console.log(publicUrl);
  }

  return publicUrl;
}
