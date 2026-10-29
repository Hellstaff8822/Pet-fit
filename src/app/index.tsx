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
            <Text className="text-4xl font-bold text-primaryDark">petfit.</Text>
          </View>

          <PetImagePlaceholder height={270} label="Pet photo coming soon" />

          <View className="mt-8">
            <Text className="text-[40px] leading-[46px] font-display text-text">
              Different lives.{"\n"}Perfect companions.
            </Text>

            <Text className="mt-4 font-body text-base leading-6 text-textSecondary">
              Find the right pet for your lifestyle, space, and everyday
              routine.
            </Text>
          </View>

          <View className="mt-auto pt-8">
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/quiz")}
              className="h-14 items-center justify-center rounded-2xl bg-primary"
            >
              <Text className="font-bodySemibold text-base text-white">
                Find my match →
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() =>
                Alert.alert(
                  "Coming later",
                  "Pet profiles are planned for a future release.",
                )
              }
              className="mt-3 h-12 items-center justify-center"
            >
              <Text className="font-semibold text-primaryDark">
                I already have a pet →
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
