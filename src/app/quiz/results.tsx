import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";

export default function QuizResultsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      className="flex-1 justify-between bg-cream px-6 pb-8 pt-6"
      style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
    >
      <Text className="font-bodyBold text-xl text-primaryDark">petfit.</Text>

      <View className="rounded-2xl border border-border bg-surface p-6">
        <Text className="mb-3 font-bodyMedium text-sm text-primary">ВІКТОРИНУ ЗАВЕРШЕНО</Text>
        <Text className="mb-3 font-display text-[32px] leading-[40px] text-text">
          Дякуємо за відповіді
        </Text>
        <Text className="font-body text-base leading-6 text-textSecondary">
          Персональні рекомендації тварин поки що недоступні. Ми не будемо вгадувати,
          який улюбленець підійде саме тобі.
        </Text>
      </View>

      <View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/quiz")}
          className="h-14 items-center justify-center rounded-2xl bg-primary"
        >
          <Text className="font-bodySemibold text-base text-white">Пройти вікторину ще раз</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/")}
          className="mt-3 h-12 items-center justify-center"
        >
          <Text className="font-bodySemibold text-base text-primaryDark">На головну</Text>
        </Pressable>
      </View>
    </View>
  );
}
