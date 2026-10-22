import { Text, View } from "react-native";
import { PawPrint } from "lucide-react-native";

type PetImagePlaceholderProps = {
  height?: number;
  label?: string;
};

export function PetImagePlaceholder({
  height = 240,
  label = "Pet photo coming soon",
}: PetImagePlaceholderProps) {
  return (
    <View
      style={{ height }}
      className="items-center justify-center rounded-[28px] bg-[#E6E8E3]"
    >
      <PawPrint size={48} color="#9CA59D" />

      <Text className="mt-3 text-xs uppercase tracking-widest text-textMuted">
        {label}
      </Text>
    </View>
  );
}
