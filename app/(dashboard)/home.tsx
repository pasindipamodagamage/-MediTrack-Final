import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const Home = () => {
  const features: { id: string; title: string; icon: keyof typeof MaterialIcons.glyphMap; description: string }[] = [
    { id: '1', title: 'Medicine Management', icon: 'medical-services', description: 'Browse and order medicines with detailed information' },
    { id: '2', title: 'Health Packages', icon: 'inventory', description: 'Specialized health packages tailored to your needs' },
    { id: '3', title: 'Wellness Guidance', icon: 'favorite', description: 'Daily health tips and medication reminders' },
    { id: '4', title: '24/7 Support', icon: 'support-agent', description: 'Round the clock customer support and consultation' },
  ];

  const contactMethods: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string }[] = [
    { id: '1', type: 'Phone', value: '+94 77 379 3891', icon: 'phone', action: '+94 77 379 3891' },
    { id: '2', type: 'Email', value: 'support@meditrack.com', icon: 'email', action: 'mailto:support@meditrack.com' },
    { id: '3', type: 'Address', value: 'Main Road, Galle', icon: 'location-on', action: 'https://maps.google.com' },
  ];

  return (
      <View style={styles.container}>
        {/* Hero Header */}
        <View style={styles.header}>
          <View style={styles.headerDecor}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>WELCOME TO</Text>
            <Text style={styles.appName}>Medi Track</Text>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerDot} />
              <View style={styles.dividerLine} />
              <View style={styles.dividerDot} />
            </View>
            <Text style={styles.tagline}>Trusted Care, Anytime, Anywhere</Text>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* About Us Section */}
          <View style={styles.aboutSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.headerDash} />
              <Text style={styles.sectionTitle}>About Us</Text>
              <View style={styles.headerDash} />
            </View>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>
                Medi Track is a next-generation healthcare mobile application designed to make medication management effortless while promoting better health outcomes. It seamlessly integrates traditional healthcare support with modern digital innovation.
              </Text>
              <Text style={styles.aboutText}>
                Our mission is to create a simple, user-friendly platform that connects pharmacies with their customers while fostering long-term wellness in the community.
              </Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.headerDash} />
              <Text style={styles.sectionTitle}>Our Features</Text>
              <View style={styles.headerDash} />
            </View>
            <View style={styles.featuresGrid}>
              {features.map((item) => (
                  <View key={item.id} style={styles.featureCard}>
                    <View style={styles.featureHeader}>
                      <View style={styles.featureIconBg}>
                        <MaterialIcons name={item.icon} size={28} color="#4A90E2" />
                      </View>
                    </View>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureDescription}>{item.description}</Text>
                    <View style={styles.featureBottomBar} />
                  </View>
              ))}
            </View>
          </View>

          {/* Contact Us Section */}
          <View style={styles.contactSection}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.headerDash} />
              <Text style={styles.sectionTitle}>Get In Touch</Text>
              <View style={styles.headerDash} />
            </View>
            <Text style={styles.contactIntro}>
              Have questions or need assistance? We&#39;re here to help you 24/7!
            </Text>

            <View style={styles.contactMethods}>
              {contactMethods.map(item => (
                  <TouchableOpacity
                      key={item.id}
                      style={styles.contactCard}
                      onPress={() => Linking.openURL(item.action)}
                      activeOpacity={0.7}
                  >
                    <View style={styles.contactLeft}>
                      <View style={styles.contactIconWrapper}>
                        <MaterialIcons name={item.icon} size={22} color="#4A90E2" />
                      </View>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactType}>{item.type}</Text>
                        <Text style={styles.contactValue}>{item.value}</Text>
                      </View>
                    </View>
                    <View style={styles.contactArrow}>
                      <MaterialIcons name="arrow-forward" size={18} color="#64748B" />
                    </View>
                  </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerDivider} />
            <Text style={styles.footerBrand}>Medi Track</Text>
            <Text style={styles.footerText}>© 2025 Medi-Care. All rights reserved.</Text>
          </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 50,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  headerDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(74, 144, 226, 0.05)',
  },
  headerContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  greeting: {
    color: '#64748B',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 10,
  },
  appName: {
    color: '#1E293B',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
  },
  dividerLine: {
    width: 50,
    height: 2,
    backgroundColor: '#4A90E2',
    marginHorizontal: 8,
  },
  tagline: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerDash: {
    width: 30,
    height: 2,
    backgroundColor: '#4A90E2',
    marginHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  aboutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  aboutText: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
    textAlign: 'left',
    fontWeight: '400',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIconBg: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(74, 144, 226, 0.2)',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 12,
  },
  featureBottomBar: {
    height: 3,
    width: 40,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
    alignSelf: 'center',
  },
  contactSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  contactIntro: {
    color: '#475569',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
  contactMethods: {
    marginTop: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(74, 144, 226, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactType: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '700',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  contactArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginTop: 20,
  },
  footerDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
    marginBottom: 20,
  },
  footerBrand: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '400',
  },
});

export default Home;