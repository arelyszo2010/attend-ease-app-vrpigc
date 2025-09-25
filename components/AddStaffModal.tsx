
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import SimpleBottomSheet from './BottomSheet';

interface AddStaffModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddStaff: (name: string) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isVisible,
  onClose,
  onAddStaff,
}) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Error', 'Please enter a staff member name');
      return;
    }
    
    onAddStaff(trimmedName);
    setName('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={handleClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Add New Staff Member</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter staff member's full name"
            placeholderTextColor={colors.textSecondary}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAdd}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.addButtonText]}>Add Staff</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SimpleBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.backgroundAlt,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.grey,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: colors.textSecondary,
  },
  addButtonText: {
    color: colors.backgroundAlt,
  },
});

export default AddStaffModal;
