// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList, ValidationErrorKeys } from '../types';
import { colors } from '../styles/colors';
import { validateForm, hasErrors } from '../utils/validation';
import CustomInput from '../components/CustomInput';
import LanguageSelector from '../components/LanguageSelector';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ValidationErrorKeys>({});

  const handleLogin = () => {
    const validationErrors = validateForm(mobile, aadhaar, email);
    setErrors(validationErrors);

    if (!hasErrors(validationErrors)) {
      navigation.navigate('QRCode', {
        userData: { mobile, aadhaar, email },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LanguageSelector />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>{t('Tourist Login')}</Text>
            <Text style={styles.subtitle}>{t('Please enter your details to continue')}</Text>

            <View style={styles.form}>
              <CustomInput
                placeholder="Mobile Number"
                translatedPlaceholder={t('Mobile Number')}
                value={mobile}
                onChangeText={setMobile}
                error={errors.mobile ? t(errors.mobile) : undefined}
                keyboardType="numeric"
                maxLength={10}
              />

              <CustomInput
                placeholder="Aadhaar Number"
                translatedPlaceholder={t('Aadhaar Number')}
                value={aadhaar}
                onChangeText={setAadhaar}
                error={errors.aadhaar ? t(errors.aadhaar) : undefined}
                keyboardType="numeric"
                maxLength={12}
              />

              <CustomInput
                placeholder="Email ID"
                translatedPlaceholder={t('Email ID')}
                value={email}
                onChangeText={setEmail}
                error={errors.email ? t(errors.email) : undefined}
                keyboardType="email-address"
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>{t('Login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;