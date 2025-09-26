// src/components/LanguageSelector.tsx
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

interface Language {
  code: string;
  label: string;
  description: string;
}

const languages: Language[] = [
  { code: 'en', label: 'EN', description: 'English' },
  { code: 'bn', label: 'BN', description: 'Bengali' },
  { code: 'hi', label: 'HI', description: 'Hindi' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      setIsDropdownVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsDropdownVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{currentLanguage.label}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.dropdownItem,
                  currentLanguage.code === language.code && styles.selectedItem,
                ]}
                onPress={() => changeLanguage(language.code)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    currentLanguage.code === language.code && styles.selectedText,
                  ]}
                >
                  {language.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 50,
  },
  buttonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  arrow: {
    color: colors.text,
    fontSize: 10,
    marginLeft: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minWidth: 80,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  selectedItem: {
    backgroundColor: colors.primary,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedText: {
    fontWeight: 'bold',
  },
});

export default LanguageSelector;