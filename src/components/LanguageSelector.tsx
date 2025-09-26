// src/components/LanguageSelector.tsx

/**
 * LanguageSelector Component
 * 
 * A dropdown language selector that allows users to switch between different languages
 * in the application. The component displays the currently selected language and 
 * provides a modal dropdown with available language options.
 * 
 * Features:
 * - Displays current language (EN/BN/HI) in a styled button
 * - Modal dropdown that appears when button is pressed
 * - Automatic language switching with i18next integration
 * - Persistent language selection using AsyncStorage
 * - Closes automatically after selection
 * - Matches the app's pastel green color scheme
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/colors';

/**
 * Language interface defining the structure for supported languages
 */
interface Language {
  code: string; // Language code used by i18next (e.g., 'en', 'bn', 'hi')
  label: string; // Display label shown in the UI (e.g., 'EN', 'BN', 'HI')
  description: string;  // Display description in the dropdown (e.g. 'English', 'Bengali', 'Hindi')
}

/**
 * Array of supported languages in the application
 * Add new languages here to extend multilingual support
 */
const languages: Language[] = [
  { code: 'en', label: 'EN', description: 'English' }, // English
  { code: 'bn', label: 'BN', description: 'Bengali' }, // Bengali
  { code: 'hi', label: 'HI', description: 'Hindi' }, // Hindi
];

/**
 * LanguageSelector Component
 * 
 * Renders a language selector button with dropdown functionality.
 * Handles language switching and persistence automatically.
 * 
 * @returns {JSX.Element} The LanguageSelector component
 */
const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  
  // State to control the visibility of the dropdown modal
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Find the current language object based on i18n's current language
  // Falls back to the first language (English) if current language is not found
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  /**
   * Handles language change when user selects a new language
   * 
   * @param {string} languageCode - The language code to switch to (e.g., 'en', 'bn', 'hi')
   */
  const changeLanguage = async (languageCode: string) => {
    try {
      // Change the language in i18next
      await i18n.changeLanguage(languageCode);
      
      // Persist the selected language in AsyncStorage for future app launches
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      
      // Close the dropdown modal
      setIsDropdownVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
      // Note: Consider adding user-friendly error handling in production
    }
  };

  return (
    <View style={styles.container}>
      {/* Main language selector button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsDropdownVisible(true)}
        activeOpacity={0.8}
        accessibilityLabel="Select language"
        accessibilityHint="Opens language selection dropdown"
      >
        <Text style={styles.buttonText}>{currentLanguage.label}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {/* Modal dropdown for language selection */}
      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
        accessibilityViewIsModal={true}
      >
        {/* Overlay that closes modal when pressed */}
        <Pressable
          style={styles.overlay}
          onPress={() => setIsDropdownVisible(false)}
          accessibilityLabel="Close language selector"
        >
          {/* Dropdown container - prevents event bubbling */}
          <View style={styles.dropdown}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.dropdownItem,
                  // Highlight the currently selected language
                  currentLanguage.code === language.code && styles.selectedItem,
                ]}
                onPress={() => changeLanguage(language.code)}
                activeOpacity={0.7}
                accessibilityLabel={`Select ${language.label} language`}
                accessibilityState={{ selected: currentLanguage.code === language.code }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    // Style the selected language text differently
                    currentLanguage.code === language.code && styles.selectedText,
                  ]}
                >
                  {language.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

/**
 * Styles for the LanguageSelector component
 * Uses the app's pastel green color scheme for consistency
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  
  // Main selector button styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary, // Light pastel green
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8, // Rounded corners as requested
    elevation: 2, // Android shadow
    shadowColor: colors.shadow, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 50, // Ensures button has minimum width
  },
  
  // Button text (current language code)
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  
  // Dropdown arrow
  arrow: {
    color: colors.text,
    fontSize: 10,
    marginLeft: 2,
  },
  
  // Modal overlay (semi-transparent background)
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Dropdown container
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8, // Higher elevation for dropdown
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minWidth: 80, // Ensures dropdown has minimum width
  },
  
  // Individual dropdown item
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  
  // Highlighted style for currently selected language
  selectedItem: {
    backgroundColor: colors.primary, // Same as button background
  },
  
  // Text style for dropdown items
  dropdownText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Text style for selected language in dropdown
  selectedText: {
    fontWeight: 'bold', // Make selected language bold
  },
});

export default LanguageSelector;