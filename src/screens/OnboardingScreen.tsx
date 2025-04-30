"use client"
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../context/ThemeContext"
import Button from "../components/Button"

const { width } = Dimensions.get("window")

const OnboardingScreen = () => {
  const navigation = useNavigation()
  const { colors, fontSizes } = useTheme()

  const handleGetStarted = () => {
    navigation.navigate("Questionnaire" as never)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary, fontSize: fontSizes.xxl }]}>FitApp</Text>
          <Text style={[styles.subtitle, { color: colors.text, fontSize: fontSizes.lg }]}>
            Your Personal Fitness Journey
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: "/placeholder.svg?height=300&width=300" }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.features}>
          <FeatureItem
            icon="fitness"
            title="Personalized Workouts"
            description="Get workout plans tailored to your fitness goals"
            colors={colors}
          />
          <FeatureItem
            icon="trending-up"
            title="Track Progress"
            description="Monitor your weight, measurements, and workout achievements"
            colors={colors}
          />
          <FeatureItem
            icon="calendar"
            title="Daily Activity"
            description="Log your daily activities and stay on track"
            colors={colors}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            variant="primary"
            size="large"
            onPress={handleGetStarted}
            style={{ width: width * 0.8 }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

interface FeatureItemProps {
  icon: string
  title: string
  description: string
  colors: any
}

const FeatureItem = ({ icon, title, description, colors }: FeatureItemProps) => {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.featureText}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.featureDescription, { color: colors.text }]}>{description}</Text>
      </View>
    </View>
  )
}

// Import at the top of the file
import { Ionicons } from "@expo/vector-icons"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: width * 0.8,
    height: 200,
  },
  features: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
})

export default OnboardingScreen
