import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PetImagePlaceholder } from "../components/PetImagePlaceholder";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      className="flex-1 bg-cream"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-8 pt-6">
          <View className="mb-8">
            <Text className="text-4xl font-bold text-primaryDark">Petfit.</Text>
          </View>

          <PetImagePlaceholder height={270} label="Фото улюбленця незабаром" />

          <View className="mt-8">
            <Text className="text-[40px] leading-[46px] font-display text-text">
              Різні стилі життя.{"\n"}Ідеальні компаньйони.
            </Text>

            <Text className="mt-4 font-body text-base leading-6 text-textSecondary">
              Знайди улюбленця, який пасуватиме твоєму способу життя, житлу та щоденному ритму.
            </Text>
          </View>

          <View className="mt-auto pt-8">
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/quiz")}
              className="h-14 items-center justify-center rounded-2xl bg-primary"
            >
              <Text className="font-bodySemibold text-base text-white">
                Підібрати улюбленця →
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() =>
                Alert.alert(
                  "Незабаром",
                  "Профілі домашніх улюбленців з’являться в майбутніх оновленнях.",
                )
              }
              className="mt-3 h-12 items-center justify-center"
            >
              <Text className="font-semibold text-primaryDark">
                У мене вже є улюбленець →
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
