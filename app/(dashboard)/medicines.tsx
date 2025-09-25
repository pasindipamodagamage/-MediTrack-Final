import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { Medicine } from '../../types/medicine';
import { getMedicine, saveMedicine, updateMed, deleteMed } from '@/services/medicineService';
import { useAuth } from '@/context/AuthContext';
import { getCurrentUser } from '@/services/authService';

const MedicinesScreen = () => {
  const { user } = useAuth()
  const [medicines, setMedicine] = useState<Medicine[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState<Medicine>({
    id: '',
    title: '',
    qty: 0,
    unitPrice: 0,
    email: ''
  });

  React.useEffect(() => {
    getAllMedicine();
  }, []);

  const theme = {
    light: {
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212121',
      secondaryText: '#757575',
      accent: '#4a90e2',
      border: '#e0e0e0',
    },
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      text: '#f5f5f5',
      secondaryText: '#b0b0b0',
      accent: '#4a90e2',
      border: '#2d2d2d',
    },
  };

  const colors = isDarkTheme ? theme.dark : theme.light;

  const handleInputChange = (name: keyof Medicine, value: string) => {
    setFormData({
      ...formData,
      [name]: name === 'qty' ? parseInt(value) || 0
          : name === 'unitPrice' ? parseFloat(value) || 0
              : value
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      qty: 0,
      unitPrice: 0,
      email: ''
    });
    setIsEditing(false);
  };

  const openEditModal = (medicine: Medicine) => {
    setFormData(medicine);
    setIsEditing(true);
    setModalVisible(true);
  };

  const addMedicine = async () => {
    try {
      if (!formData.title.trim()) {
        Alert.alert('Error', 'Please enter a title for your medicine');
        return;
      }

      const email = await getCurrentUser();
      if (!email) {
        Alert.alert('Error', 'No user is currently logged in');
        return;
      }

      const newMedicine: Medicine = {
        id: '',
        title: formData.title,
        qty: formData.qty,
        unitPrice: parseFloat(formData.unitPrice.toString()), // float support
        email
      };

      await saveMedicine(newMedicine);
      Alert.alert('Success', 'Medicine added successfully');
      getAllMedicine();

      setModalVisible(false);
    } catch (error) {
      console.error("Error adding Medicine:", error);
      Alert.alert('Error', 'Failed to add Medicine. Please try again.');
    }
  };

  const updateExistingMedicine = async () => {
    try {
      if (!formData.title.trim()) {
        Alert.alert('Error', 'Please enter a title for your medicine');
        return;
      }

      const email = await getCurrentUser();
      if (email) {
        formData.email = email;
      } else {
        Alert.alert('Error', 'No user is currently logged in');
        return;
      }

      await updateMed(formData.id, {
        title: formData.title,
        qty: formData.qty,
        unitPrice: formData.unitPrice,
        email: formData.email
      });
      Alert.alert('Success', 'Medicine updated successfully');
      getAllMedicine()
      resetForm();
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating medicine:", error);
      Alert.alert('Error', 'Failed to update medicine. Please try again.');
    }
  };

  const handleSave = () => {
    if (isEditing) {
      updateExistingMedicine();
    } else {
      addMedicine();
    }
  };

  const deleteMedicine = async (id: string) => {
    try {
      await deleteMed(id);
      Alert.alert('Success', 'Medicine deleted successfully');
      getAllMedicine()
    } catch (error) {
      console.error("Error deleting medicine:", error);
      Alert.alert('Error', 'Failed to delete medicine. Please try again.');
    }
  };

  const getAllMedicine = async () => {
    try {
      const email = user ? user.email : await getCurrentUser();
      if (email) {
        const medicines1 = await getMedicine();
        const userMedicines = medicines1.filter(medicine => medicine.email === email);
        setMedicine(userMedicines);
      } else {
        Alert.alert('Error', 'No user is currently logged in');
      }
    } catch (error) {
      console.error("Error fetching medicine:", error);
      Alert.alert('Error', 'Failed to fetch medicines. Please try again.');
    }
  };

  const renderMedicineItem = (item: Medicine) => (
      <View key={item.id} style={[styles.reminderItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.reminderContent}>
          <Text style={[styles.reminderTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.reminderNote, { color: colors.secondaryText }]}>
            Qty: {item.qty} | Price: {item.unitPrice}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => openEditModal(item)} style={styles.editButton}>
            <Text style={[styles.editButtonText, { color: colors.accent }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteMedicine(item.id)} style={styles.deleteButton}>
            <Text style={[styles.deleteButtonText, { color: '#e53935' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Medicine</Text>
          <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)} style={styles.themeToggle}>
            <Text style={[styles.themeToggleText, { color: colors.accent }]}>
              {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Medicine List */}
        <ScrollView style={styles.remindersList}>
          {medicines.length > 0 ? (
              medicines.map(renderMedicineItem)
          ) : (
              <View style={styles.emptyState}>
                <Text style={[styles.emptyStateText, { color: colors.secondaryText }]}>
                  No Medicine yet. Add one to get started!
                </Text>
              </View>
          )}
        </ScrollView>

        {/* Add Medicine Button */}
        <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.accent }]}
            onPress={() => {
              resetForm();
              setModalVisible(true);
            }}
        >
          <Text style={styles.addButtonText}>+ Add Medicine</Text>
        </TouchableOpacity>

        {/* Add/Edit Medicine Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              resetForm();
              setModalVisible(false);
            }}
        >
          <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                {isEditing ? 'Edit Medicine' : 'Add New Medicine'}
              </Text>

              <TextInput
                  style={[styles.input, {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border
                  }]}
                  placeholder="Title"
                  placeholderTextColor={colors.secondaryText}
                  value={formData.title}
                  onChangeText={(text) => handleInputChange('title', text)}
              />

              <TextInput
                  style={[styles.input, {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border
                  }]}
                  placeholder="Quantity"
                  placeholderTextColor={colors.secondaryText}
                  keyboardType="numeric"
                  value={formData.qty.toString()}
                  onChangeText={(text) => handleInputChange('qty', text)}
              />

              <TextInput
                  style={[styles.input, {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderColor: colors.border
                  }]}
                  placeholder="Unit Price"
                  placeholderTextColor={colors.secondaryText}
                  keyboardType="numeric"
                  value={formData.unitPrice.toString()}
                  onChangeText={(text) => handleInputChange('unitPrice', text)}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton, { borderColor: colors.border }]}
                    onPress={() => {
                      resetForm();
                      setModalVisible(false);
                    }}
                >
                  <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: colors.accent }]}
                    onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>
                    {isEditing ? 'Update' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 20,
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  themeToggle: {
    padding: 8,
  },
  themeToggleText: {
    fontWeight: '600',
  },
  remindersList: {
    flex: 1,
    padding: 16,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderNote: {
    fontSize: 14,
    marginBottom: 8,
  },
  reminderDateTime: {
    flexDirection: 'row',
  },
  reminderDate: {
    fontSize: 12,
    marginRight: 12,
  },
  reminderTime: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  editButtonText: {
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    borderWidth: 1,
  },
  cancelButtonText: {
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default MedicinesScreen;

