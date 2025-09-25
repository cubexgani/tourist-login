// src/screens/QRCodeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import QRCode from 'react-native-qrcode-svg';
import { RootStackParamList } from '../types';
import { colors } from '../styles/colors';
import BackButton from '../components/BackButton';
import { decryptId, generateId } from '../utils/encryption';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';

type QRCodeScreenRouteProp = RouteProp<RootStackParamList, 'QRCode'>;
type QRCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QRCode'>;

interface Props {
  route: QRCodeScreenRouteProp;
  navigation: QRCodeScreenNavigationProp;
}

const QRCodeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userData } = route.params;
    const { t } = useTranslation();
  
  // Create JSON string for QR code
  const qrData = generateId(userData.mobile, userData.aadhaar, userData.email);
  console.log("Decrypted data: ", decryptId(qrData));

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LanguageSelector />
      </View>
      <View style={styles.content}>
        <BackButton onPress={handleGoBack} />
        
        <View style={styles.qrSection}>
          <Text style={styles.title}> { t('Your ID Token') }</Text>
          
          <View style={styles.qrContainer}>
            <QRCode
              value={qrData}
              size={200}
              backgroundColor={colors.white}
              color={colors.text}
            />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>{ t('Token Details:')}</Text>
            <Text style={styles.infoText}>{ t('Mobile') + ':' } {userData.mobile}</Text>
            <Text style={styles.infoText}>{ t('Aadhaar') + ':' } {userData.aadhaar}</Text>
            <Text style={styles.infoText}>{ t('Email') + ':' } {userData.email}</Text>
          </View>
        </View>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  qrSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  qrContainer: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 40,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 8,
  },
});

export default QRCodeScreen;