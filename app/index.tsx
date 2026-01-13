import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [minute, setMinute] = useState<string>("")
  const [second, setSecond] = useState<string>("")
  const [watt, setWatt] = useState<number>(500)

  const calculateTime = (targetWatt: number) => {
    const m = parseInt(minute, 10) || 0
    const s = parseInt(second, 10) || 0
    const totalSecond = (m * 60) + s
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
      return `${resM}分`
    }

    if (resM > 0) {
      return `${resM}分${resS}秒`
    }

    return `${resS}秒`
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectArea}>
        {[500, 600, 800, 1000].map((w) => (
          <TouchableOpacity
            key={w}
            style={styles.button}
            onPress={() => setWatt(w)}
          >
            <Text>{w}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputArea}>
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