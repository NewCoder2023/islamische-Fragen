import { StyleSheet } from "react-native";
import { router, Link } from "expo-router";
import { SafeAreaView, Text, View } from "components/Themed";
import { StatusBar } from "expo-status-bar";

export default function Modal() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <SafeAreaView style={styles.container}>
      {!isPresented && <Link href='../'>Dismiss</Link>}

      <View style={styles.content}>
        <Text style={styles.headerText}>Richtlinien der Fragestellung</Text>
        <Text style={styles.mainText}>
          1. Stell zunächst bitte sicher, dass Du die Suchfunktion genutzt hast
          und noch keine Antwort auf Deine Frage vorhanden ist. 2. Stell die
          Frage bitte so kurz wie möglich aber gleichzeitig so ausführlich wie
          nötig, um die Frage richtig verstehen zu können. 3. Sorge bitte dafür,
          dass die Frage in einer - sprachlich betrachtet - verständlichen Art
          verfasst ist. 4. Wir bitten darum nur Fragen zu stellen, die
          realistisch sind und bei denen ein praktischer, tatsächlicher Bedarf
          besteht, keine hypothetischen oder theoretischen Fragen über
          unwahrscheinliche Fälle. 5. Achte bitte darauf, dass wir keine
          Anfragen zu Traumdeutungen oder Istikharah-Anfragen beantworten. 6.
          Fragen, in denen Personen, Firmen oder Vereine namentlich erwähnt
          werden, werden nicht beantwortet. 7. Wir behalten uns vor sensible
          Fragen in manchen Fällen unbeantwortet zu lassen. 8. Nur Rechtsfragen
          werden entsprechend der Ansicht des angegebenen Rechtsgelehrten
          (Marja) beantwortet. 9. Bitte berücksichtige, dass es eine Vielzahl an
          gestellten Fragen gibt. Daher bitten wir um Geduld, bis die Fragen
          beantwortet werden können. 10. Es wird versucht innerhalb von 72
          Stunden auf die Frage zu antworten. Bitte sieh davon ab, die Frage
          erneut zu stellen, wenn du innerhalb der genannten Frist noch keine
          Antwort erhalten hast. 11. Durch das Absenden der Frage, bist du damit
          einverstanden, dass wir Deine Frage zusammen mit unserer Antwort,
          *ohne* Angabe jeglicher persönlicher Daten des Absenders, in der
          Datenbank der App aufzunehmen und sie zu veröffentlichen. 12. Deine
          persönlichen Angaben (Name, Alter und E-Mail Adresse) werden
          vertraulich behandelt und dienen nur der Beantwortung der Fragen. Sie
          werden nicht an Dritte weitergeleitet.
        </Text>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerText: {
    marginHorizontal: 10,
    marginVertical: 20,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  mainText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
