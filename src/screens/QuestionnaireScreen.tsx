"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { useUser } from "../context/UserContext"
import Button from "../components/Button"

interface Question {
  id: string
  question: string
  type: "text" | "number" | "select" | "multiselect"
  options?: string[]
  key: keyof UserProfile
}

interface UserProfile {
  id: string
  name: string
  age: number
  gender: string
  height: number
  weight: number
  goalWeight: number
  fitnessLevel: "beginner" | "intermediate" | "advanced"
  fitnessGoals: string[]
  preferredWorkoutDays: string[]
  workoutDuration: number
}

const QuestionnaireScreen = () => {
  const navigation = useNavigation()
  const { colors, fontSizes, spacing } = useTheme()
  const { setUser, setIsOnboarded } = useUser()

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<UserProfile>>({
    id: Date.now().toString(),
    fitnessGoals: [],
    preferredWorkoutDays: [],
  })

  const questions: Question[] = [
    {
      id: "1",
      question: "What is your name?",
      type: "text",
      key: "name",
    },
    {
      id: "2",
      question: "How old are you?",
      type: "number",
      key: "age",
    },
    {
      id: "3",
      question: "What is your gender?",
      type: "select",
      options: ["Male", "Female", "Non-binary", "Prefer not to say"],
      key: "gender",
    },
    {
      id: "4",
      question: "What is your height (in cm)?",
      type: "number",
      key: "height",
    },
    {
      id: "5",
      question: "What is your current weight (in kg)?",
      type: "number",
      key: "weight",
    },
    {
      id: "6",
      question: "What is your goal weight (in kg)?",
      type: "number",
      key: "goalWeight",
    },
    {
      id: "7",
      question: "What is your fitness level?",
      type: "select",
      options: ["beginner", "intermediate", "advanced"],
      key: "fitnessLevel",
    },
    {
      id: "8",
      question: "What are your fitness goals?",
      type: "multiselect",
      options: [
        "Weight loss",
        "Muscle gain",
        "Improve endurance",
        "Increase strength",
        "Better flexibility",
        "Overall health",
      ],
      key: "fitnessGoals",
    },
    {
      id: "9",
      question: "Which days do you prefer to workout?",
      type: "multiselect",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      key: "preferredWorkoutDays",
    },
    {
      id: "10",
      question: "How long can you workout per session (in minutes)?",
      type: "number",
      key: "workoutDuration",
    },
  ]

  const handleTextChange = (text: string, key: keyof UserProfile) => {
    setAnswers((prev) => ({ ...prev, [key]: text }))
  }

  const handleNumberChange = (text: string, key: keyof UserProfile) => {
    const value = text ? Number.parseInt(text, 10) : 0
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSelectOption = (option: string, key: keyof UserProfile) => {
    setAnswers((prev) => ({ ...prev, [key]: option }))
  }

  const handleMultiSelectOption = (option: string, key: keyof UserProfile) => {
    setAnswers((prev) => {
      const currentArray = (prev[key] as string[]) || []
      if (currentArray.includes(option)) {
        return {
          ...prev,
          [key]: currentArray.filter((item) => item !== option),
        }
      } else {
        return {
          ...prev,
          [key]: [...currentArray, option],
        }
      }
    })
  }

  const isOptionSelected = (option: string, key: keyof UserProfile) => {
    const value = answers[key]
    if (Array.isArray(value)) {
      return value.includes(option)
    }
    return value === option
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete the questionnaire
      setUser(answers as UserProfile)
      setIsOnboarded(true)
      navigation.navigate("MainTabs" as never)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const renderQuestionContent = () => {
    const { type, key, options } = currentQuestion

    switch (type) {
      case "text":
        return (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.card,
              },
            ]}
            value={answers[key] as string}
            onChangeText={(text) => handleTextChange(text, key)}
            placeholder="Enter your answer"
            placeholderTextColor={colors.text + "80"}
          />
        )
      case "number":
        return (
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.card,
              },
            ]}
            value={answers[key]?.toString() || ""}
            onChangeText={(text) => handleNumberChange(text, key)}
            keyboardType="numeric"
            placeholder="Enter a number"
            placeholderTextColor={colors.text + "80"}
          />
        )
      case "select":
        return (
          <View style={styles.optionsContainer}>
            {options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isOptionSelected(option, key) ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleSelectOption(option, key)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isOptionSelected(option, key) ? "white" : colors.text,
                    },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )
      case "multiselect":
        return (
          <View style={styles.optionsContainer}>
            {options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  {
                    backgroundColor: isOptionSelected(option, key) ? colors.primary : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => handleMultiSelectOption(option, key)}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isOptionSelected(option, key) ? "white" : colors.text,
                    },
                  ]}
                >
                  {option}
                </Text>
                {isOptionSelected(option, key) && (
                  <Ionicons name="checkmark" size={16} color="white" style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
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
          <Text style={[styles.progressText, { color: colors.text }]}>
            {currentStep + 1} of {questions.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.questionText, { color: colors.text, fontSize: fontSizes.xl }]}>
          {currentQuestion.question}
        </Text>

        {renderQuestionContent()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && <Button title="Back" variant="outline" onPress={handleBack} style={{ marginRight: 10 }} />}
        <Button title={currentStep === questions.length - 1 ? "Finish" : "Next"} onPress={handleNext} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "right",
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  questionText: {
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 8,
    minWidth: "45%",
  },
  optionText: {
    fontSize: 16,
  },
  checkIcon: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
})

export default QuestionnaireScreen
