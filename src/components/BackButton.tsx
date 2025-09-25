// src/components/BackButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../styles/colors';

interface BackButtonProps {
  onPress: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.arrow}>←</Text>
        <Text style={styles.text}>{t('Back to Login')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  arrow: {
    fontSize: 20,
    color: colors.text,
    marginRight: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
});

export default BackButton;