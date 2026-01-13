import { Text, TouchableOpacity } from "react-native"

type Props = {
  content: number
  onPress: () => void
  isActive: boolean
}

export default function WattButton({ content, onPress, isActive = false }: Props) {
  return (
    <TouchableOpacity
      className={`rounded-2xl px-4 py-2 text-[12px] ${isActive ? 'bg-cyan-600' : 'bg-cyan-600/10'}`}
      onPress={onPress}
    >
      <Text className={isActive ? 'text-white' : 'text-cyan-600'}>{content}</Text>
    </TouchableOpacity>
  )
}