import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { ThemeProvider } from "./src/context/ThemeContext"
import { UserProvider } from "./src/context/UserContext"
import { WorkoutProvider } from "./src/context/WorkoutContext"

// Screens
import OnboardingScreen from "./src/screens/OnboardingScreen"
import QuestionnaireScreen from "./src/screens/QuestionnaireScreen"
import MainTabs from "./src/navigation/MainTabs"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <WorkoutProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
              </Stack.Navigator>
            </NavigationContainer>
          </WorkoutProvider>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
