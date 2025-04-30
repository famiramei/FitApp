"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useWorkout } from "../context/WorkoutContext"
import WorkoutCard from "../components/WorkoutCard"
import Card from "../components/Card"
import Button from "../components/Button"

const WorkoutScreen = () => {
  const { colors, fontSizes } = useTheme()
  const { availableWorkoutPlans, selectedWorkoutPlan, selectWorkoutPlan } = useWorkout()
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  const filters = [
    { id: "all", name: "All" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
    { id: "strength", name: "Strength" },
    { id: "weight-loss", name: "Weight Loss" },
  ]

  const filteredWorkouts =
    selectedFilter && selectedFilter !== "all"
      ? availableWorkoutPlans.filter(
          (plan) =>
            plan.level === selectedFilter ||
            plan.goals.some((goal) => goal.toLowerCase().includes(selectedFilter.toLowerCase())),
        )
      : availableWorkoutPlans

  const handleSelectPlan = (planId: string) => {
    selectWorkoutPlan(planId)
  }

  const renderFilterItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        {
          backgroundColor: selectedFilter === item.id ? colors.primary : "transparent",
          borderColor: selectedFilter === item.id ? colors.primary : colors.border,
        },
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text style={[styles.filterText, { color: selectedFilter === item.id ? "white" : colors.text }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Workout Plans</Text>
      </View>

      <FlatList
        horizontal
        data={filters}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      />

      {selectedWorkoutPlan && (
        <Card variant="elevated" style={styles.currentPlanCard}>
          <View style={styles.currentPlanHeader}>
            <Ionicons name="fitness" size={24} color={colors.primary} />
            <Text style={[styles.currentPlanTitle, { color: colors.text, fontSize: fontSizes.md }]}>
              Your Current Plan
            </Text>
          </View>
          <Text style={[styles.currentPlanName, { color: colors.text, fontSize: fontSizes.lg }]}>
            {selectedWorkoutPlan.name}
          </Text>
          <View style={styles.currentPlanDetails}>
            <View style={styles.currentPlanDetail}>
              <Ionicons name="calendar-outline" size={16} color={colors.text} />
              <Text style={[styles.currentPlanDetailText, { color: colors.text }]}>
                {selectedWorkoutPlan.duration} weeks
              </Text>
            </View>
            <View style={styles.currentPlanDetail}>
              <Ionicons name="time-outline" size={16} color={colors.text} />
              <Text style={[styles.currentPlanDetailText, { color: colors.text }]}>
                {selectedWorkoutPlan.daysPerWeek} days/week
              </Text>
            </View>
          </View>
          <Button title="Start Today's Workout" variant="primary" style={{ marginTop: 16 }} onPress={() => {}} />
        </Card>
      )}

      <Text
        style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.lg, marginLeft: 16, marginTop: 16 }]}
      >
        {selectedWorkoutPlan ? "Other Plans" : "Available Plans"}
      </Text>

      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.name}
            description={item.description}
            duration={30} // Placeholder duration
            level={item.level}
            onPress={() => handleSelectPlan(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutsList}
      />
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
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
  },
  currentPlanCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  currentPlanHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  currentPlanTitle: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  currentPlanName: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  currentPlanDetails: {
    flexDirection: "row",
  },
  currentPlanDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  currentPlanDetailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  workoutsList: {
    paddingBottom: 16,
  },
})

export default WorkoutScreen
