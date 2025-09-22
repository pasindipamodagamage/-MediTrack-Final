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
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/types/user";
import { registerUser } from "@/services/authService";


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

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState<boolean>(true);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      console.log("⚠️ Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("⚠️ Passwords do not match");
      return;
    }

    if (password.length < 6) {
      console.log("⚠️ Password should be at least 6 characters");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    console.log("🚀 Registering user with email:", email);

    try {
      const response = await registerUser({ email, password } as User);

      if (response) {
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          console.log("✅ Registration simulated successfully!");
          alert("Registration Successful")
          router.push("/login");
          setIsLoading(false);
        }, 1500);
      } else {
        console.log("❌ Registration failed");
        alert("Registration Failed")
        setIsLoading(false);
      }
    } catch (error) {
      console.log("❌ Error during registration:", error);
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
              {/* Logo/Header Section */}
              <View style={styles.logoContainer}>
                <MedicalCrossIcon size={80} color="#FF0000" />
                <Text style={styles.appName}>Medi Track</Text>
                <Text style={styles.tagline}>Trusted Care, Anytime, Anywhere</Text>
              </View>

              {/* Registration Form */}
              <View style={styles.formContainer}>
                <View style={styles.headerSection}>
                  <Text style={styles.welcomeText}>Create Account</Text>
                  <Text style={styles.instructionText}>
                    Sign up to get started with Medi Track
                  </Text>
                  <View style={styles.headerAccent} />
                </View>

                <View style={styles.inputsSection}>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputIconContainer}>
                      <Ionicons name="mail-outline" size={20} color="#4A90E2" />
                    </View>
                    <TextInput
                        placeholder="Email address"
                        placeholderTextColor="#94A3B8"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputIconContainer}>
                      <Ionicons name="lock-closed-outline" size={20} color="#4A90E2" />
                    </View>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#94A3B8"
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
                          color="#64748B"
                      />
                    </Pressable>
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputIconContainer}>
                      <Ionicons name="shield-checkmark-outline" size={20} color="#4A90E2" />
                    </View>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor="#94A3B8"
                        style={styles.input}
                        secureTextEntry={confirmSecureTextEntry}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Pressable
                        onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
                        style={styles.eyeIcon}
                    >
                      <Ionicons
                          name={confirmSecureTextEntry ? "eye-off-outline" : "eye-outline"}
                          size={20}
                          color="#64748B"
                      />
                    </Pressable>
                  </View>
                </View>

                <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                    onPress={handleRegister}
                    activeOpacity={0.8}
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator color="#FFFFFF" size="small" />
                        <Text style={styles.loadingText}>Creating Account...</Text>
                      </View>
                  ) : (
                      <View style={styles.buttonContent}>
                        <Text style={styles.registerButtonText}>Create Account</Text>
                        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                      </View>
                  )}
                </TouchableOpacity>

                <View style={styles.termsContainer}>
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{" "}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Already have an account?</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Pressable
                    style={styles.loginButton}
                    onPress={() => router.push("/login")}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
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
    backgroundColor: "#F8FAFC",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  content: {
    padding: 20,
  },
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
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(74, 144, 226, 0.08)",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  instructionText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
  },
  headerAccent: {
    width: 60,
    height: 3,
    backgroundColor: "#4A90E2",
    borderRadius: 2,
  },
  inputsSection: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(74, 144, 226, 0.1)",
  },
  inputIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "500",
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  registerButton: {
    height: 60,
    borderRadius: 16,
    backgroundColor: "#4A90E2",
    marginBottom: 20,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  termsContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  termsText: {
    color: "#64748B",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "400",
  },
  termsLink: {
    color: "#4A90E2",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(148, 163, 184, 0.3)",
  },
  dividerText: {
    color: "#64748B",
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    backgroundColor: "#FFFFFF",
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Register;
