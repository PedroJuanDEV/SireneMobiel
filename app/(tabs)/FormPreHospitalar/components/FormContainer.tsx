// components/FormContainer.tsx (Crie esta pasta e arquivo)

import { Stack, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FormContainerProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
  onAdvance: () => void;
  onCancel: () => void;
  showAdvanceButton: boolean;
  advanceText?: string;
  showSaveButton?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  currentStep,
  totalSteps,
  title,
  children,
  onAdvance,
  onCancel,
  showAdvanceButton,
  advanceText = 'Avançar',
  showSaveButton = true,
}) => {
  const navigation = useNavigation();

  // Define o cabeçalho para seguir o estilo da imagem
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title,
      headerStyle: {
        backgroundColor: '#1E40AF', // Azul escuro
      },
      headerTintColor: '#fff', // Cor branca para o texto do cabeçalho
      headerTitleAlign: 'center',
    });
  }, [navigation, title]);


  const renderSteps = () => {
    return Array.from({ length: totalSteps }, (_, index) => (
      <View
        key={index}
        style={[
          styles.stepCircle,
          { backgroundColor: index + 1 === currentStep ? '#E32636' : '#fff' }, // Vermelho para o passo atual
          { borderColor: index + 1 === currentStep ? '#E32636' : '#A9A9A9' }, // Borda
        ]}
      >
        <Text style={[styles.stepText, { color: index + 1 === currentStep ? '#fff' : '#A9A9A9' }]}>
          {index + 1}
        </Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: title, headerShown: true }} />

      {/* Cabeçalho Fixo (Simulação do cabeçalho da imagem) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>PRÉ-HOSPITALAR - CVI</Text>
        <Text style={styles.headerTextSubtitle}>Natureza 1</Text>
      </View>

      {/* Indicador de Etapas */}
      <View style={styles.stepsContainer}>
        {renderSteps()}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {children}
        </View>
      </ScrollView>

      {/* Botões de Ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        {showSaveButton && (
          <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Salvar Rascunho')}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        )}

        {showAdvanceButton && (
          <TouchableOpacity style={styles.advanceButton} onPress={onAdvance}>
            <Text style={styles.buttonText}>{advanceText}</Text>
          </TouchableOpacity>
        )}

        {/* O botão de '+' da imagem não está implementado aqui, mas você pode adicioná-lo */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#1E40AF', // Azul Escuro (Cor da barra superior)
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTextSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  cancelButton: {
    backgroundColor: '#9CA3AF', // Cinza
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FBBF24', // Amarelo/Laranja (para salvar rascunho)
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  advanceButton: {
    backgroundColor: '#22C55E', // Verde
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FormContainer;