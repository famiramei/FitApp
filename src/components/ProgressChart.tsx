"use client"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { useTheme } from "../context/ThemeContext"

interface ProgressChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
      color?: (opacity: number) => string
      strokeWidth?: number
    }[]
  }
  title: string
  unit?: string
  height?: number
  width?: number
}

const ProgressChart = ({
  data,
  title,
  unit = "",
  height = 220,
  width = Dimensions.get("window").width - 40,
}: ProgressChartProps) => {
  const { colors, fontSizes } = useTheme()

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 1,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary,
    },
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.lg }]}>{title}</Text>
      <LineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        yAxisSuffix={unit ? ` ${unit}` : ""}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
  },
})

export default ProgressChart
