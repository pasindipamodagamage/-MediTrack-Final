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
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <View style={styles.welcomeSection}>
              <Text style={styles.greeting}>WELCOME TO</Text>
              <Text style={styles.appName}>Medi Track</Text>
              <View style={styles.accentLine} />
              <Text style={styles.tagline}>Trusted Care, Anytime, Anywhere</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* About Us Section */}
          <View style={styles.aboutSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About Us</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Text style={styles.aboutText}>
              Medi Track is a next-generation healthcare mobile application designed to make medication management effortless while promoting better health outcomes. It seamlessly integrates traditional healthcare support with modern digital innovation.
            </Text>
            <Text style={styles.aboutText}>
              Our mission is to create a simple, user-friendly platform that connects pharmacies with their customers while fostering long-term wellness in the community.
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Our Features</Text>
              <View style={styles.titleUnderline} />
            </View>
            <View style={styles.featuresGrid}>
              {features.map((item, index) => (
                  <View key={item.id} style={[styles.featureCard, {
                    transform: [{ scale: 1 }],
                    opacity: 1
                  }]}>
                    <View style={styles.featureIconContainer}>
                      <MaterialIcons name={item.icon} size={32} color="#4A90E2" />
                    </View>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureDescription}>{item.description}</Text>
                    <View style={styles.featureAccent} />
                  </View>
              ))}
            </View>
          </View>

          {/* Contact Us Section */}
          <View style={styles.contactSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Get In Touch</Text>
              <View style={styles.titleUnderline} />
            </View>
            <Text style={styles.contactIntro}>
              Have questions or need assistance? We're here to help you 24/7!
            </Text>

            <View style={styles.contactMethods}>
              {contactMethods.map(item => (
                  <TouchableOpacity
                      key={item.id}
                      style={styles.contactCard}
                      onPress={() => Linking.openURL(item.action)}
                      activeOpacity={0.7}
                  >
                    <View style={styles.contactIconContainer}>
                      <MaterialIcons name={item.icon} size={24} color="#4A90E2" />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactType}>{item.type}</Text>
                      <Text style={styles.contactValue}>{item.value}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color="#999" />
                  </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.footerBrand}>Medi Track</Text>
              <Text style={styles.footerText}>© 2025 Medi-Care. All rights reserved.</Text>
            </View>
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
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 144, 226, 0.03)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  welcomeSection: {
    alignItems: 'center',
  },
  greeting: {
    color: '#64748B',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 8,
  },
  appName: {
    color: '#1E293B',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 12,
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
    marginBottom: 12,
  },
  tagline: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  aboutSection: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  aboutText: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '400',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  featureIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
  },
  featureAccent: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    transform: [{ rotate: '45deg' }, { translateX: 15 }, { translateY: -15 }],
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  contactIntro: {
    color: '#475569',
    fontSize: 16,
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
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  contactIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    marginLeft: 16,
    flex: 1,
  },
  contactType: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
  },
  footer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginTop: 24,
  },
  footerContent: {
    alignItems: 'center',
  },
  footerBrand: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Home;
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
// import React from "react";
// import { MaterialIcons } from "@expo/vector-icons";
//
// const Home = () => {
//   const features: { id: string; title: string; icon: keyof typeof MaterialIcons.glyphMap; description: string }[] = [
//     { id: '1', title: 'Medicine Management', icon: 'medical-services', description: 'Browse and order medicines with detailed information' },
//     { id: '2', title: 'Health Packages', icon: 'inventory', description: 'Specialized health packages tailored to your needs' },
//     { id: '3', title: 'Wellness Guidance', icon: 'favorite', description: 'Daily health tips and medication reminders' },
//     { id: '4', title: '24/7 Support', icon: 'support-agent', description: 'Round the clock customer support and consultation' },
//   ];
//
//   const contactMethods: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string }[] = [
//     { id: '1', type: 'Phone', value: '+94 77 379 3891', icon: 'phone', action: '+94 77 379 3891' },
//     { id: '2', type: 'Email', value: 'support@meditrack.com', icon: 'email', action: 'mailto:support@meditrack.com' },
//     { id: '3', type: 'Address', value: 'Main Road, Galle', icon: 'location-on', action: 'https://maps.google.com' },
//   ];
//
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <View style={styles.welcomeSection}>
//             <Text style={styles.greeting}>Welcome to</Text>
//             <Text style={styles.appName}>Medi Track</Text>
//             <Text style={styles.tagline}>Trusted Care, Anytime, Anywhere</Text>
//           </View>
//         </View>
//       </View>
//
//       {/* Main Content */}
//       <ScrollView style={styles.content}>
//         {/* About Us Section */}
//         <View style={styles.aboutSection}>
//           <Text style={styles.sectionTitle}>About </Text>
//           <Text style={styles.aboutText}>
//             Medi Track is a next-generation healthcare mobile application designed to make medication management effortless while promoting better health outcomes. It seamlessly integrates traditional healthcare support with modern digital innovation, helping users track prescriptions, set reminders, and monitor their health progress with ease.
//           </Text>
//           <Text style={styles.aboutText}>
//             Our mission is to create a simple, user-friendly platform that connects pharmacies
//             with their customers while fostering long-term wellness in the community.
//           </Text>
//         </View>
//
//         {/* Features Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Our Features</Text>
//           <View style={styles.featuresGrid}>
//             {features.map(item => (
//               <View key={item.id} style={styles.featureCard}>
//                 <View style={styles.featureIconContainer}>
//                   <MaterialIcons name={item.icon} size={28} color="#000" />
//                 </View>
//                 <Text style={styles.featureTitle}>{item.title}</Text>
//                 <Text style={styles.featureDescription}>{item.description}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//
//         {/* Contact Us Section */}
//         <View style={styles.contactSection}>
//           <Text style={styles.sectionTitle}>Contact Us</Text>
//           <Text style={styles.contactIntro}>
//             Have questions or need assistance? We&apos;re here to help you!
//           </Text>
//
//           <View style={styles.contactMethods}>
//             {contactMethods.map(item => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={styles.contactCard}
//                 onPress={() => Linking.openURL(item.action)}
//               >
//                 <MaterialIcons name={item.icon} size={24} color="#000" />
//                 <View style={styles.contactInfo}>
//                   <Text style={styles.contactType}>{item.type}</Text>
//                   <Text style={styles.contactValue}>{item.value}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//
//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>© 2025 Medi-Care. All rights reserved.</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   welcomeSection: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   greeting: {
//     color: '#666',
//     fontSize: 16,
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//     fontWeight: '300',
//   },
//   appName: {
//     color: '#000',
//     fontSize: 36,
//     fontWeight: '800',
//     marginTop: 5,
//     letterSpacing: -0.5,
//   },
//   tagline: {
//     color: '#666',
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 4,
//   },
//   content: {
//     flex: 1,
//   },
//   aboutSection: {
//     padding: 25,
//     margin: 16,
//     borderRadius: 16,
//     backgroundColor: '#f8f8f8',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   section: {
//     backgroundColor: '#fff',
//     padding: 20,
//     margin: 16,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 20,
//     textAlign: 'center',
//     letterSpacing: -0.5,
//   },
//   aboutText: {
//     color: '#333',
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   featuresGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   featureCard: {
//     width: '48%',
//     backgroundColor: '#f8f8f8',
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 16,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   featureIconContainer: {
//     backgroundColor: '#fff',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   featureTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#000',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   featureDescription: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   contactSection: {
//     padding: 25,
//     margin: 16,
//     borderRadius: 16,
//     backgroundColor: '#f8f8f8',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   contactIntro: {
//     color: '#333',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     lineHeight: 24,
//   },
//   contactMethods: {
//     marginTop: 10,
//   },
//   contactCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   contactInfo: {
//     marginLeft: 16,
//   },
//   contactType: {
//     fontSize: 14,
//     color: '#000',
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   contactValue: {
//     fontSize: 14,
//     color: '#333',
//   },
//   footer: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   footerText: {
//     color: '#666',
//     fontSize: 14,
//   },
// });
//
// export default Home;