"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useWorkout } from "../context/WorkoutContext"
import { useUser } from "../context/UserContext"
import Card from "../components/Card"
import ProgressChart from "../components/ProgressChart"
import Button from "../components/Button"

const ProgressScreen = () => {
  const { colors, fontSizes } = useTheme()
  const { progressEntries, addProgressEntry } = useWorkout()
  const { user, updateUserProfile } = useUser()

  const [activeTab, setActiveTab] = useState("weight")
  const [newWeight, setNewWeight] = useState("")

  const handleAddWeight = () => {
    if (newWeight && !isNaN(Number.parseFloat(newWeight))) {
      const weight = Number.parseFloat(newWeight)

      // Add to progress entries
      addProgressEntry({
        date: new Date(),
        weight,
      })

      // Update user profile
      if (user) {
        updateUserProfile({ weight })
      }

      // Clear input
      setNewWeight("")
    }
  }

  // Prepare data for weight chart
  const weightData = {
    labels: progressEntries.slice(-7).map((entry) => {
      const date = new Date(entry.date)
      return `${date.getMonth() + 1}/${date.getDate()}`
    }),
    datasets: [
      {
        data: progressEntries.slice(-7).map((entry) => entry.weight),
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  }

  // Calculate progress towards goal
  const calculateProgress = () => {
    if (!user?.weight || !user?.goalWeight) return 0

    const startWeight = progressEntries.length > 0 ? progressEntries[0].weight : user.weight
    const currentWeight = user.weight
    const goalWeight = user.goalWeight

    // If goal is to lose weight
    if (startWeight > goalWeight) {
      const totalToLose = startWeight - goalWeight
      const lost = startWeight - currentWeight
      return Math.min(100, Math.max(0, (lost / totalToLose) * 100))
    }
    // If goal is to gain weight
    else if (startWeight < goalWeight) {
      const totalToGain = goalWeight - startWeight
      const gained = currentWeight - startWeight
      return Math.min(100, Math.max(0, (gained / totalToGain) * 100))
    }

    return 100 // Already at goal
  }

  const progress = calculateProgress()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Your Progress</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "weight" && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab("weight")}
        >
          <Text style={[styles.tabText, { color: activeTab === "weight" ? colors.primary : colors.text }]}>Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "workouts" && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab("workouts")}
        >
          <Text style={[styles.tabText, { color: activeTab === "workouts" ? colors.primary : colors.text }]}>
            Workouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "measurements" && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
          ]}
          onPress={() => setActiveTab("measurements")}
        >
          <Text style={[styles.tabText, { color: activeTab === "measurements" ? colors.primary : colors.text }]}>
            Measurements
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "weight" && (
          <>
            <Card variant="elevated" style={styles.goalCard}>
              <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Goal Progress</Text>
              <View style={styles.goalInfo}>
                <View>
                  <Text style={[styles.goalText, { color: colors.text }]}>Current: {user?.weight || "--"} kg</Text>
                  <Text style={[styles.goalText, { color: colors.text }]}>Goal: {user?.goalWeight || "--"} kg</Text>
                </View>
                <View style={styles.progressCircle}>
                  <Text style={[styles.progressText, { color: colors.primary }]}>{Math.round(progress)}%</Text>
                </View>
              </View>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              </View>
            </Card>

            <Card variant="default" style={styles.chartCard}>
              <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Weight History</Text>
              {progressEntries.length > 0 ? (
                <ProgressChart data={weightData} title="" unit="kg" />
              ) : (
                <Text style={[styles.noDataText, { color: colors.text }]}>
                  No weight data available yet. Add your first entry below.
                </Text>
              )}
            </Card>

            <Card variant="default" style={styles.addEntryCard}>
              <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Add New Entry</Text>
              <View style={styles.addEntryForm}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.card,
                    },
                  ]}
                  value={newWeight}
                  onChangeText={setNewWeight}
                  placeholder="Enter weight (kg)"
                  placeholderTextColor={colors.text + "80"}
                  keyboardType="numeric"
                />
                <Button title="Add" onPress={handleAddWeight} style={{ marginLeft: 8 }} />
              </View>
            </Card>
          </>
        )}

        {activeTab === "workouts" && (
          <View style={styles.centeredContent}>
            <Ionicons name="fitness-outline" size={64} color={colors.primary} />
            <Text style={[styles.comingSoonText, { color: colors.text, fontSize: fontSizes.lg }]}>
              Workout Tracking
            </Text>
            <Text style={[styles.comingSoonSubtext, { color: colors.text }]}>
              Track your workout progress and see your improvements over time.
            </Text>
            <Button title="Coming Soon" variant="outline" style={{ marginTop: 16 }} disabled />
          </View>
        )}

        {activeTab === "measurements" && (
          <View style={styles.centeredContent}>
            <Ionicons name="body-outline" size={64} color={colors.primary} />
            <Text style={[styles.comingSoonText, { color: colors.text, fontSize: fontSizes.lg }]}>
              Body Measurements
            </Text>
            <Text style={[styles.comingSoonSubtext, { color: colors.text }]}>
              Track your body measurements and see your physical changes over time.
            </Text>
            <Button title="Coming Soon" variant="outline" style={{ marginTop: 16 }} disabled />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 16,
  },
  goalCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  goalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  goalText: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FFEE9C",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  chartCard: {
    marginBottom: 16,
  },
  noDataText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
  },
  addEntryCard: {
    marginBottom: 16,
  },
  addEntryForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  comingSoonText: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  comingSoonSubtext: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
})

export default ProgressScreen
