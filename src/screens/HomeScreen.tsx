"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import { useWorkout } from "../context/WorkoutContext"
import Card from "../components/Card"
import WorkoutCard from "../components/WorkoutCard"
import Button from "../components/Button"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { colors, fontSizes } = useTheme()
  const { user } = useUser()
  const { selectedWorkoutPlan, workoutLogs } = useWorkout()

  // Calculate stats
  const totalWorkouts = workoutLogs.length
  const completedThisWeek = workoutLogs.filter((log) => {
    const logDate = new Date(log.date)
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    weekStart.setHours(0, 0, 0, 0)
    return log.completed && logDate >= weekStart
  }).length

  const getMotivationalTip = () => {
    const tips = [
      "Consistency is key to achieving your fitness goals!",
      "Remember to stay hydrated throughout your workouts.",
      "Rest days are just as important as workout days.",
      "Small progress is still progress. Keep going!",
      "Focus on your form to prevent injuries and maximize results.",
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text, fontSize: fontSizes.lg }]}>
              Hello, {user?.name || "Fitness Enthusiast"}!
            </Text>
            <Text style={[styles.subtitle, { color: colors.text, fontSize: fontSizes.md }]}>
              Let's crush your fitness goals today
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: colors.secondary }]}
            onPress={() => navigation.navigate("Profile" as never)}
          >
            <Ionicons name="person" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Card variant="elevated" style={styles.statsCard}>
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Your Progress</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary, fontSize: fontSizes.xl }]}>{totalWorkouts}</Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>Total Workouts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary, fontSize: fontSizes.xl }]}>
                {completedThisWeek}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>This Week</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary, fontSize: fontSizes.xl }]}>
                {user?.weight ? `${user.weight}kg` : "--"}
              </Text>
              <Text style={[styles.statLabel, { color: colors.text }]}>Current Weight</Text>
            </View>
          </View>
        </Card>

        <Card variant="default" style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb-outline" size={24} color={colors.primary} />
            <Text style={[styles.tipTitle, { color: colors.text, fontSize: fontSizes.md }]}>Tip of the Day</Text>
          </View>
          <Text style={[styles.tipText, { color: colors.text }]}>{getMotivationalTip()}</Text>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSizes.lg }]}>
            {selectedWorkoutPlan ? "Your Current Plan" : "Recommended Plans"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Workouts" as never)}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {selectedWorkoutPlan ? (
          <WorkoutCard
            title={selectedWorkoutPlan.name}
            description={selectedWorkoutPlan.description}
            duration={selectedWorkoutPlan.workouts[0]?.duration || 30}
            level={selectedWorkoutPlan.level}
            onPress={() => navigation.navigate("Workouts" as never)}
          />
        ) : (
          <View style={styles.noWorkoutContainer}>
            <Text style={[styles.noWorkoutText, { color: colors.text }]}>You haven't selected a workout plan yet.</Text>
            <Button
              title="Browse Plans"
              onPress={() => navigation.navigate("Workouts" as never)}
              style={{ marginTop: 16 }}
            />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  greeting: {
    fontWeight: "bold",
  },
  subtitle: {
    opacity: 0.7,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#EEEEEE",
  },
  tipCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFEE9C",
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipTitle: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
  },
  noWorkoutContainer: {
    alignItems: "center",
    padding: 24,
    marginHorizontal: 16,
  },
  noWorkoutText: {
    textAlign: "center",
    fontSize: 16,
  },
})

export default HomeScreen
