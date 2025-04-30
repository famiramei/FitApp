"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"

interface Exercise {
  id: string
  name: string
  description: string
  sets: number
  reps: number
  duration?: number
  imageUrl?: string
  videoUrl?: string
  muscleGroups: string[]
  equipment: string[]
}

interface WorkoutPlan {
  id: string
  name: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  duration: number // in weeks
  daysPerWeek: number
  goals: string[]
  workouts: Workout[]
}

interface Workout {
  id: string
  name: string
  description: string
  duration: number // in minutes
  exercises: Exercise[]
  day: number
  week: number
}

interface WorkoutLog {
  id: string
  date: Date
  workoutId: string
  completed: boolean
  duration: number // actual duration in minutes
  exercises: {
    exerciseId: string
    sets: {
      weight: number
      reps: number
      completed: boolean
    }[]
  }[]
  notes: string
}

interface ProgressEntry {
  date: Date
  weight: number
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }
  photos?: string[]
}

interface WorkoutContextType {
  availableWorkoutPlans: WorkoutPlan[]
  selectedWorkoutPlan: WorkoutPlan | null
  workoutLogs: WorkoutLog[]
  progressEntries: ProgressEntry[]
  selectWorkoutPlan: (planId: string) => void
  logWorkout: (log: WorkoutLog) => void
  addProgressEntry: (entry: ProgressEntry) => void
}

const WorkoutContext = createContext<WorkoutContextType>({
  availableWorkoutPlans: [],
  selectedWorkoutPlan: null,
  workoutLogs: [],
  progressEntries: [],
  selectWorkoutPlan: () => {},
  logWorkout: () => {},
  addProgressEntry: () => {},
})

export const useWorkout = () => useContext(WorkoutContext)

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [availableWorkoutPlans, setAvailableWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([])

  // In a real app, you would fetch these from your backend
  React.useEffect(() => {
    // Mock data for workout plans
    const mockWorkoutPlans: WorkoutPlan[] = [
      {
        id: "1",
        name: "Beginner Strength Training",
        description: "Perfect for beginners looking to build strength and muscle.",
        level: "beginner",
        duration: 8,
        daysPerWeek: 3,
        goals: ["strength", "muscle"],
        workouts: [],
      },
      {
        id: "2",
        name: "Weight Loss Challenge",
        description: "High-intensity workouts designed for maximum calorie burn.",
        level: "intermediate",
        duration: 12,
        daysPerWeek: 5,
        goals: ["weight loss", "endurance"],
        workouts: [],
      },
      {
        id: "3",
        name: "Advanced Bodybuilding",
        description: "Intense program for experienced lifters looking to maximize muscle growth.",
        level: "advanced",
        duration: 16,
        daysPerWeek: 6,
        goals: ["muscle", "strength"],
        workouts: [],
      },
    ]

    setAvailableWorkoutPlans(mockWorkoutPlans)
  }, [])

  const selectWorkoutPlan = (planId: string) => {
    const plan = availableWorkoutPlans.find((p) => p.id === planId)
    if (plan) {
      setSelectedWorkoutPlan(plan)
    }
  }

  const logWorkout = (log: WorkoutLog) => {
    setWorkoutLogs((prev) => [...prev, log])
  }

  const addProgressEntry = (entry: ProgressEntry) => {
    setProgressEntries((prev) => [...prev, entry])
  }

  return (
    <WorkoutContext.Provider
      value={{
        availableWorkoutPlans,
        selectedWorkoutPlan,
        workoutLogs,
        progressEntries,
        selectWorkoutPlan,
        logWorkout,
        addProgressEntry,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}
