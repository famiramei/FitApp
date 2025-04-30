"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import Card from "../components/Card"
import Button from "../components/Button"
import Avatar from "../components/Avatar"

const ProfileScreen = () => {
  const { colors, fontSizes } = useTheme()
  const { user, updateUserProfile } = useUser()

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [age, setAge] = useState(user?.age?.toString() || "")
  const [height, setHeight] = useState(user?.height?.toString() || "")
  const [weight, setWeight] = useState(user?.weight?.toString() || "")
  const [goalWeight, setGoalWeight] = useState(user?.goalWeight?.toString() || "")

  const handleSave = () => {
    updateUserProfile({
      name,
      age: Number.parseInt(age, 10) || 0,
      height: Number.parseInt(height, 10) || 0,
      weight: Number.parseFloat(weight) || 0,
      goalWeight: Number.parseFloat(goalWeight) || 0,
    })
    setEditing(false)
    Alert.alert("Success", "Profile updated successfully")
  }

  const handleAvatarUpload = (url: string) => {
    // In a real app, you would save this URL to the user profile
    console.log("Avatar uploaded:", url)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontSize: fontSizes.xl }]}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          <Ionicons name={editing ? "close" : "create-outline"} size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar url={null} size={120} onUpload={handleAvatarUpload} />
        </View>

        <Card variant="default" style={styles.profileCard}>
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Personal Information</Text>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Name</Text>
            {editing ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.text + "80"}
              />
            ) : (
              <Text style={[styles.profileValue, { color: colors.text }]}>{user?.name || "Not set"}</Text>
            )}
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Age</Text>
            {editing ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                placeholderTextColor={colors.text + "80"}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.profileValue, { color: colors.text }]}>{user?.age || "Not set"}</Text>
            )}
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Gender</Text>
            <Text style={[styles.profileValue, { color: colors.text }]}>{user?.gender || "Not set"}</Text>
          </View>
        </Card>

        <Card variant="default" style={styles.profileCard}>
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Body Metrics</Text>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Height (cm)</Text>
            {editing ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                value={height}
                onChangeText={setHeight}
                placeholder="Enter your height"
                placeholderTextColor={colors.text + "80"}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.profileValue, { color: colors.text }]}>{user?.height || "Not set"}</Text>
            )}
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Weight (kg)</Text>
            {editing ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter your weight"
                placeholderTextColor={colors.text + "80"}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.profileValue, { color: colors.text }]}>{user?.weight || "Not set"}</Text>
            )}
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Goal Weight (kg)</Text>
            {editing ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.card,
                  },
                ]}
                value={goalWeight}
                onChangeText={setGoalWeight}
                placeholder="Enter your goal weight"
                placeholderTextColor={colors.text + "80"}
                keyboardType="numeric"
              />
            ) : (
              <Text style={[styles.profileValue, { color: colors.text }]}>{user?.goalWeight || "Not set"}</Text>
            )}
          </View>
        </Card>

        <Card variant="default" style={styles.profileCard}>
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: fontSizes.md }]}>Fitness Preferences</Text>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Fitness Level</Text>
            <Text style={[styles.profileValue, { color: colors.text }]}>
              {user?.fitnessLevel ? user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1) : "Not set"}
            </Text>
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Fitness Goals</Text>
            <View>
              {user?.fitnessGoals && user.fitnessGoals.length > 0 ? (
                user.fitnessGoals.map((goal, index) => (
                  <Text key={index} style={[styles.profileValue, { color: colors.text }]}>
                    • {goal}
                  </Text>
                ))
              ) : (
                <Text style={[styles.profileValue, { color: colors.text }]}>Not set</Text>
              )}
            </View>
          </View>

          <View style={styles.profileItem}>
            <Text style={[styles.profileLabel, { color: colors.text }]}>Preferred Workout Days</Text>
            <View>
              {user?.preferredWorkoutDays && user.preferredWorkoutDays.length > 0 ? (
                user.preferredWorkoutDays.map((day, index) => (
                  <Text key={index} style={[styles.profileValue, { color: colors.text }]}>
                    • {day}
                  </Text>
                ))
              ) : (
                <Text style={[styles.profileValue, { color: colors.text }]}>Not set</Text>
              )}
            </View>
          </View>
        </Card>

        {editing && <Button title="Save Changes" onPress={handleSave} style={{ marginTop: 16, marginBottom: 32 }} />}
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
    paddingVertical: 16,
  },
  title: {
    fontWeight: "bold",
  },
  editButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 16,
  },
  profileLabel: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.7,
  },
  profileValue: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
})

export default ProfileScreen
