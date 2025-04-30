"use client"

import type { ReactNode } from "react"
import { View, type ViewStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface CardProps {
  children: ReactNode
  style?: ViewStyle
  variant?: "default" | "elevated" | "outlined"
}

const Card = ({ children, style, variant = "default" }: CardProps) => {
  const { colors, spacing, borderRadius } = useTheme()

  const getCardStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      padding: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: colors.card,
    }

    switch (variant) {
      case "elevated":
        baseStyle = {
          ...baseStyle,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }
        break
      case "outlined":
        baseStyle = {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.border,
        }
        break
      default: // default
        // Keep the base style
        break
    }

    return baseStyle
  }

  return <View style={[getCardStyle(), style]}>{children}</View>
}

export default Card
