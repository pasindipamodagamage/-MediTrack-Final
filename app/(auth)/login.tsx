import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

// Medical cross logo component
const MedicalCrossIcon = ({ size = 60, color = "#000" }) => {
  return (
      <View style={[styles.logo, { width: size, height: size }]}>
        <View style={[styles.crossLine, {
          backgroundColor: color,
          width: size * 0.6,
          height: size * 0.15,
          top: size * 0.425
        }]} />
        <View style={[styles.crossLine, {
          backgroundColor: color,
          width: size * 0.15,
          height: size * 0.6,
          left: size * 0.425
        }]} />
      </View>
  );
};

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const handleLogin = async () => {
    try{
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }

      if (isLoading) return;

      setIsLoading(true);
      const response = await login(email, password)
      if(response){
        setIsLoading(false);
        //set email AsyncStorage
        await AsyncStorage.setItem("userEmail", email);
        router.replace("/(dashboard)/home");
        Alert.alert("Success", "Login successful");
        setEmail("");
        setPassword("");

      }
      else{
        Alert.alert("Error", "Login failed");
        setIsLoading(false);
      }
    }catch{
      Alert.alert("Error", "Login failed. Please check your credentials and try again.");
      setIsLoading(false);
    }
  };

  return (
      <View style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.content}>
              {/* Logo/Header Section - Keep original styles */}
              <View style={styles.logoContainer}>
                <MedicalCrossIcon size={80} color="#FF0000" />
                <Text style={styles.appName}>Medi Track</Text>
                <Text style={styles.tagline}>Trusted Care, Anytime, Anywhere</Text>
              </View>

              {/* Login Form */}
              <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.instructionText}>
                  Sign in to access your account
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#4A90E2" style={styles.inputIcon} />
                  <TextInput
                      placeholder="Email"
                      placeholderTextColor="#8E8E93"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#4A90E2" style={styles.inputIcon} />
                  <TextInput
                      placeholder="Password"
                      placeholderTextColor="#8E8E93"
                      style={styles.input}
                      secureTextEntry={secureTextEntry}
                      value={password}
                      onChangeText={setPassword}
                  />
                  <Pressable
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
                      style={styles.eyeIcon}
                  >
                    <Ionicons
                        name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#4A90E2"
                    />
                  </Pressable>
                </View>

                <Pressable
                    onPress={() => Alert.alert("Info", "Forgot password feature would be implemented here")}
                    style={styles.forgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                >
                  {isLoading ? (
                      <ActivityIndicator color="#fff" size="large" />
                  ) : (
                      <View style={styles.buttonContent}>
                        <Text style={styles.loginButtonText}>Login</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                      </View>
                  )}
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Pressable
                    style={styles.signupContainer}
                    onPress={() => router.push("/register")}
                >
                  <Text style={styles.signupText}>
                    Don&apos;t have an account?{" "}
                    <Text style={styles.signupLink}>Register Now</Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 24,
  },
  // Original logo container styles - unchanged
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    backgroundColor: "#f8f8f8",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  logo: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossLine: {
    position: 'absolute',
    borderRadius: 3,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000",
    marginTop: 15,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    fontWeight: "500",
  },
  // Updated form styles
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 28,
  },
  forgotPasswordText: {
    color: "#4A90E2",
    fontSize: 15,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    height: 60,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#4A90E2",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 12,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    color: "#9CA3AF",
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "600",
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    color: "#6B7280",
    fontSize: 16,
    textAlign: "center",
  },
  signupLink: {
    color: "#4A90E2",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default Login;
