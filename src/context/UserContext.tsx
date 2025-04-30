"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  updateUserProfile: (updates: Partial<UserProfile>) => void
  isOnboarded: boolean
  setIsOnboarded: (value: boolean) => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUserProfile: () => {},
  isOnboarded: false,
  setIsOnboarded: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isOnboarded, setIsOnboarded] = useState(false)

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUserProfile, isOnboarded, setIsOnboarded }}>
      {children}
    </UserContext.Provider>
  )
}
