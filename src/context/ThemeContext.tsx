"use client"

import { createContext, useContext, type ReactNode } from "react"

// Define theme colors based on the requirements
const theme = {
  colors: {
    primary: "#E54D2E", // Reddish-orange
    secondary: "#FFEE9C", // Light yellow
    accent: "#FF8C42", // Complementary orange
    background: "#FFFFFF",
    card: "#F9F9F9",
    text: "#333333",
    border: "#DDDDDD",
    notification: "#E54D2E",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
}

const ThemeContext = createContext(theme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
