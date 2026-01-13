import NumberPad from "@/components/NumberPad";
import WattButton from "@/components/WattButton";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [minute, setMinute] = useState<number>(0)
  const [second, setSecond] = useState<number>(0)
  const [watt, setWatt] = useState<number>(500)
  const [numberInput, setNumberInput] = useState<number>(0)
  const [time, setTime] = useState<boolean>(false)

  const inputNumber = (num: number) => {
    setNumberInput((numberInput * 10) + num)
  }

  const clearNumber = () => {
    setMinute(0)
    setSecond(0)
    setNumberInput(0)
    setTime(false)
  }

  const setNumber = (type: string) => {
    if (type === "min") {
      setMinute(numberInput)
    } else if (type === "sec") {
      setSecond(numberInput)
      setTime(true)
    }
    setNumberInput(0)
  }

  const calculateTime = (targetWatt: number) => {
    const totalSecond = (minute * 60) + second
    if (totalSecond === 0) {
      return '---'
    }
    const resultTotalSeconds = watt * totalSecond / targetWatt
    let resM = Math.floor(resultTotalSeconds / 60)
    let resS = Math.floor(resultTotalSeconds % 60)

    if (resS === 60) {
      resM += 1
      resS = 0
    }

    if (resS === 0) {
      return (
        <>
          {resM}<Text className="text-[24px]">分</Text>
        </>
      )
    }

    if (resM > 0) {
      return (
        <>
          {resM}<Text className="text-[24px]">分</Text>
          {resS}<Text className="text-[24px]">秒</Text>
        </>
      )
    }

    return (
      <>
        {resS}<Text className="text-[24px]">秒</Text>
      </>
    )
  }

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="bg-cyan-500 w-full">
        <View className="pt-20 px-10">
          <Text className="text-white text-center font-bold">ワットアップ</Text>
        </View>
        <View className="gap-4 py-8">
          <View className="px-10">
            <Text className="font-bold text-white">変換後</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerClassName="gap-4 px-10"
          >
            <View className="bg-white rounded-2xl px-10 py-6 gap-2">
              <Text className="font-bold text-[16px] leading-none text-cyan-600">500w</Text>
              <Text className="font-bold text-[32px] leading-none">
                {calculateTime(500)}
              </Text>
            </View>
            <View className="bg-white rounded-2xl px-10 py-6 gap-2">
              <Text className="font-bold text-[16px] leading-none text-cyan-600">600w</Text>
              <Text className="font-bold text-[32px] leading-none">
                {calculateTime(600)}
              </Text>
            </View>
            <View className="bg-white rounded-2xl px-10 py-6 gap-2">
              <Text className="font-bold text-[16px] leading-none text-cyan-600">800w</Text>
              <Text className="font-bold text-[32px] leading-none">
                {calculateTime(800)}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <View className="flex-1 py-8 w-full gap-6">
        <View className="gap-4 py-4 px-10">
          <Text className="font-bold text-cyan-600">変換前</Text>
          <View className="flex-row gap-2 justify-center items-center">
            <Text className="text-cyan-600 font-bold">{watt}w</Text>
            <Text className="font-bold text-[32px] leading-none">
              {minute > 0 && (
                <>
                  <Text>{minute}</Text>
                  <Text className="text-[24px]">分</Text>
                </>
              )}
              {second > 0 && (
                <>
                  <Text>{second}</Text>
                  <Text className="text-[24px]">秒</Text>
                </>
              )}
              {!time && (
                <Text className="text-slate-200">{numberInput}</Text>
              )}
            </Text>
          </View>
        </View>
        <View>
          <View className="gap-6">
            <ScrollView
              horizontal
              contentContainerClassName="gap-3 px-10"
            >
              {[500, 600, 700, 800, 900, 1000, 1200].map((w) => (
                <WattButton
                  key={w}
                  content={w}
                  onPress={() => setWatt(w)}
                  isActive={w === watt}
                />
              ))}
            </ScrollView>
            <View className="items-center px-10">
              <View className="flex-row flex-wrap gap-4 w-[304px]">
                <NumberPad number="7" onPress={() => !time && inputNumber(7)} />
                <NumberPad number="8" onPress={() => !time && inputNumber(8)} />
                <NumberPad number="9" onPress={() => !time && inputNumber(9)} />
                <NumberPad number="C" onPress={() => clearNumber()} />
                <NumberPad number="4" onPress={() => !time && inputNumber(4)} />
                <NumberPad number="5" onPress={() => !time && inputNumber(5)} />
                <NumberPad number="6" onPress={() => !time && inputNumber(6)} />
                <NumberPad number="分" onPress={() => !time && setNumber("min")} />
                <NumberPad number="1" onPress={() => !time && inputNumber(1)} />
                <NumberPad number="2" onPress={() => !time && inputNumber(2)} />
                <NumberPad number="3" onPress={() => !time && inputNumber(3)} />
                <NumberPad number="秒" onPress={() => !time && setNumber("sec")} />
                <NumberPad number="0" onPress={() => !time && inputNumber(0)} />
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.inputArea}>
          <Text style={styles.text}>{watt}W</Text>
          <TextInput
            style={styles.input}
            value={minute}
            keyboardType="number-pad"
            placeholder="00"
            onChangeText={minute => setMinute(minute)}
          />
          <Text style={styles.text}>分</Text>
          <TextInput
            style={styles.input}
            value={second}
            keyboardType="number-pad"
            placeholder="00"
            onChangeText={second => setSecond(second)}
          />
          <Text style={styles.text}>秒</Text>
        </View>
        <View style={styles.resultArea}>
          <Text style={styles.text}>500W : {calculateTime(500)}</Text>
          <Text style={styles.text}>600W : {calculateTime(600)}</Text>
          <Text style={styles.text}>800W : {calculateTime(800)}</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#060913',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32
  },
  selectArea: {
    flexDirection: 'row',
    gap: 8
  },
  inputArea: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  resultArea: {
    gap: 8
  },
  text: {
    color: '#fff',
    fontSize: 18
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    backgroundColor: '#fff',
    width: 40
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#060913',
    padding: 16
  }
})