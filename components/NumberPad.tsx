import { Text, TouchableOpacity } from "react-native"

type Props = {
  number: string
  onPress: () => void
}

export default function NumberPad({ number, onPress }: Props) {
  return (
    <TouchableOpacity
      className="w-[64px] h-[64px] aspect-square flex items-center justify-center bg-cyan-600/10 rounded-xl"
      onPress={onPress}
    >
      <Text className="font-bold leading-none text-cyan-600">{number}</Text>
    </TouchableOpacity>
  )
}