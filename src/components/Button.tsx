"use client"
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
  type ViewStyle,
  type TextStyle,
} from "react-native"
import { useTheme } from "../context/ThemeContext"

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = ({
  title,
  variant = "primary",
  size = "medium",
  loading = false,
  style,
  textStyle,
  ...props
}: ButtonProps) => {
  const { colors, spacing, borderRadius, fontSizes } = useTheme()

  const getButtonStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    }

    // Size styles
    switch (size) {
      case "small":
        baseStyle = {
          ...baseStyle,
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
        }
        break
      case "large":
        baseStyle = {
          ...baseStyle,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
        }
        break
      default: // medium
        baseStyle = {
          ...baseStyle,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
        }
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle = {
          ...baseStyle,
          backgroundColor: colors.secondary,
          borderWidth: 0,
        }
        break
      case "outline":
        baseStyle = {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
        }
        break
      default: // primary
        baseStyle = {
          ...baseStyle,
          backgroundColor: colors.primary,
          borderWidth: 0,
        }
    }

    return baseStyle
  }

  const getTextStyle = (): TextStyle => {
    let baseStyle: TextStyle = {
      fontWeight: "600",
    }

    // Size styles
    switch (size) {
      case "small":
        baseStyle = {
          ...baseStyle,
          fontSize: fontSizes.sm,
        }
        break
      case "large":
        baseStyle = {
          ...baseStyle,
          fontSize: fontSizes.lg,
        }
        break
      default: // medium
        baseStyle = {
          ...baseStyle,
          fontSize: fontSizes.md,
        }
    }

    // Variant styles
    switch (variant) {
      case "secondary":
        baseStyle = {
          ...baseStyle,
          color: colors.text,
        }
        break
      case "outline":
        baseStyle = {
          ...baseStyle,
          color: colors.primary,
        }
        break
      default: // primary
        baseStyle = {
          ...baseStyle,
          color: "white",
        }
    }

    return baseStyle
  }

  return (
    <TouchableOpacity style={[getButtonStyle(), style]} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={variant === "outline" ? colors.primary : "white"} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
