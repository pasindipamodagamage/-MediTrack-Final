import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser, logout } from "@/services/authService";
import { UserData } from "@/types/user";
import { getUserById, saveUser } from "@/services/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const router = useRouter();
  const currentEmail = getCurrentUser() ?? "";

  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
  );
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: currentEmail,
    phone: "",
    age: "",
    address: "",
  });
  const [saved, setSaved] = useState(false); // Track if profile is saved

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const data = await getUserById(userId);
          if (data) {
            setUserData(data);
            console.log("Fetched user data:", data);
          } else {
            console.log("No user data found for ID:", userId);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const saveUserData = async () => {
    if (!userData.name || !userData.email || !userData.phone) {
      Alert.alert("Error", "Please fill in all required fields (Name, Email, Phone)");
      return;
    }

    try {
      const response = await saveUser(userData);
      if (!response) {
        Alert.alert("Error", "User credentials not saved");
        return;
      }

      await AsyncStorage.setItem("userId", response);
      setEditing(false);
      setSaved(true); // Mark as saved to hide the button
      Alert.alert("Success", "Profile updated successfully!");
      console.log("User Data Saved:", response);
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert("Error", "Something went wrong while saving profile");
    }
  };



  

  const handleLogout = async () => {
    console.log("🔒 User logged out");
    try {
      await logout();
      Alert.alert("Success", "You have been logged out");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Edit Button (hide if saved) */}
          {!saved && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={async () => {
                if (editing) {
                  await saveUserData();
                } else {
                  setEditing(true);
                }
              }}
            >
              <Text style={styles.editButtonText}>{editing ? "Save Changes" : "Edit Profile"}</Text>
            </TouchableOpacity>
          )}

          {/* Profile Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => handleInputChange("name", text)}
                editable={editing}
                placeholder="Enter your full name"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={userData.email}
                editable={editing}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                value={userData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                editable={editing}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={userData.age}
                onChangeText={(text) => handleInputChange("age", text)}
                editable={editing}
                keyboardType="numeric"
                placeholder="Enter your age"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={userData.address}
                onChangeText={(text) => handleInputChange("address", text)}
                editable={editing}
                multiline
                placeholder="Enter your address"
                placeholderTextColor="#888"
              />
            </View>
          </View>

          {/* Additional Info Cards */}
          <View style={styles.infoCardsContainer}>
            <View style={styles.infoCard}>
              <Ionicons name="calendar" size={24} color="#007AFF" />
              <View style={styles.infoCardContent}>
                <Text style={styles.infoCardTitle}>Member Since</Text>
                <Text style={styles.infoCardValue}>January 2024</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="document" size={24} color="#34C759" />
              <View style={styles.infoCardContent}>
                <Text style={styles.infoCardTitle}>Prescriptions</Text>
                <Text style={styles.infoCardValue}>3 Active</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="people" size={24} color="#FF9500" />
              <View style={styles.infoCardContent}>
                <Text style={styles.infoCardTitle}>Family Members</Text>
                <Text style={styles.infoCardValue}>2 Registered</Text>
              </View>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: { padding: 8, borderRadius: 20, backgroundColor: "#f8f8f8" },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#000", letterSpacing: -0.5 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  profileSection: { alignItems: "center" },
  profileImageContainer: { position: "relative", marginBottom: 24 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#f8f8f8" },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  editButton: { backgroundColor: "#000", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25, marginBottom: 24 },
  editButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  form: { width: "100%", marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#000", marginBottom: 8 },
  input: { backgroundColor: "#f8f8f8", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e0e0e0", fontSize: 16, color: "#000" },
  textArea: { minHeight: 100, textAlignVertical: "top" },
  infoCardsContainer: { width: "100%", gap: 16, marginBottom: 30 },
  infoCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#f8f8f8", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "#e0e0e0" },
  infoCardContent: { marginLeft: 16, flex: 1 },
  infoCardTitle: { fontSize: 14, color: "#666", fontWeight: "500", marginBottom: 4 },
  infoCardValue: { fontSize: 18, color: "#000", fontWeight: "600" },
  logoutButton: { backgroundColor: "#FF3B30", paddingVertical: 16, borderRadius: 12, marginTop: 20, width: "100%", alignItems: "center", marginBottom: 30 },
  logoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default Account;
