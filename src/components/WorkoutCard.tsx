"use client"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import Card from "./Card"

interface WorkoutCardProps {
  title: string
  description: string
  duration: number
  level: "beginner" | "intermediate" | "advanced"
  imageUrl?: string
  onPress: () => void
}

const WorkoutCard = ({ title, description, duration, level, imageUrl, onPress }: WorkoutCardProps) => {
  const { colors, spacing, fontSizes } = useTheme()

  const getLevelColor = () => {
    switch (level) {
      case "beginner":
        return colors.success
      case "intermediate":
        return colors.warning
      case "advanced":
        return colors.error
      default:
        return colors.text
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card variant="elevated" style={styles.card}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.secondary }]}>
            <Ionicons name="fitness" size={40} color={colors.primary} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.lg }]}>{title}</Text>
          <Text style={[styles.description, { color: colors.text, fontSize: fontSizes.sm }]} numberOfLines={2}>
            {description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>{duration} min</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="barbell-outline" size={16} color={getLevelColor()} />
              <Text style={[styles.infoText, { color: getLevelColor() }]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 0,
    overflow: "hidden",
  },
  image: {
    height: 150,
    width: "100%",
  },
  imagePlaceholder: {
    height: 150,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
  },
})

export default WorkoutCard
