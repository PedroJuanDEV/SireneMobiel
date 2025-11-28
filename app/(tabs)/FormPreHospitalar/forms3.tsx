// app/(tabs)/FormPreHospitalar/forms3.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainer from './components/FormContainer'; // Importação simplificada

// Componente para a Assinatura (Simulação simples com campo de texto por enquanto)
const AssinaturaDigital: React.FC = () => {
    // Em um app real, aqui você usaria um componente de assinatura por toque (e.g., react-native-signature-canvas)
    return (
        <View style={styles.signatureArea}>
            <Text style={styles.signatureLabel}>Assinatura digital</Text>
            <TextInput
                style={styles.signatureInput}
                placeholder="Desenhe ou digite o nome do responsável"
                multiline
            />
            <Text style={styles.signatureInfo}>O termo de recusa deve ser impresso e assinado</Text>
        </View>
    );
};

// Componente de Campo Simples (Reutilizado)
const FormField: React.FC<{ label: string; placeholder: string; isSmall?: boolean }> = ({ label, placeholder, isSmall = false }) => (
    <View style={[styles.inputGroup, isSmall && styles.smallInputGroup]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} />
    </View>
);

export default function Forms3Natureza1() {
  const router = useRouter();
  const [sexo, setSexo] = useState('');

  const handleAdvance = () => {
    // Navega para a próxima etapa
    router.push('/FormPreHospitalar/forms4'); 
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <FormContainer
      currentStep={3}
      totalSteps={5}
      title="Forms3-Natureza 1"
      onAdvance={handleAdvance}
      onCancel={handleCancel}
      showAdvanceButton={true}
    >
        <AssinaturaDigital />
        
        {/* Dados do Supervisor/Responsável */}
        <Text style={styles.sectionTitle}>Dados de Controle</Text>

        <View style={styles.row}>
            <FormField label="Idade" placeholder="Ex: 35" isSmall />
            <View style={[styles.inputGroup, styles.smallInputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Sexo</Text>
                <View style={styles.radioRow}>
                    <TouchableOpacity 
                        style={[styles.radioOption, sexo === 'M' && styles.radioOptionSelected]}
                        onPress={() => setSexo('M')}
                    >
                        <Text style={[styles.radioText, sexo === 'M' && styles.radioTextSelected]}>M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.radioOption, sexo === 'F' && styles.radioOptionSelected]}
                        onPress={() => setSexo('F')}
                    >
                        <Text style={[styles.radioText, sexo === 'F' && styles.radioTextSelected]}>F</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <FormField label="CPF do responsável" placeholder="000.000.000-00" />
        <FormField label="Tipo de acidente" placeholder="Ex: Queda, Colisão" />
        <FormField label="Tempo de cena (min)" placeholder="Ex: 15" />
        <FormField label="Atrasa interno (min)" placeholder="Ex: 5" />


        {/* Outras informações (Organizadas em colunas para simular o layout) */}
        <View style={styles.multiColumnRow}>
            <FormField label="Saída do Quartel" placeholder="00:00" isSmall />
            <FormField label="Chegada no local" placeholder="00:00" isSmall />
        </View>
        <View style={styles.multiColumnRow}>
            <FormField label="Chegada no hospital" placeholder="00:00" isSmall />
            <FormField label="Finalização do serviço" placeholder="00:00" isSmall />
        </View>
        <View style={styles.multiColumnRow}>
            <FormField label="CTF Local" placeholder="12345" isSmall />
            <FormField label="CTF VTR Local" placeholder="67890" isSmall />
        </View>
        
        <FormField label="Nº do Despachante" placeholder="Ex: 123" />
        
    </FormContainer>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        color: '#1E40AF', 
    },
    // --- Estilos de Inputs ---
    inputGroup: {
        marginBottom: 10,
    },
    smallInputGroup: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    multiColumnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10, // Espaçamento entre as colunas
        marginBottom: 10,
    },
    // --- Estilos de Assinatura ---
    signatureArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        minHeight: 120, // Altura para o campo de assinatura
        marginBottom: 15,
    },
    signatureLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 5,
    },
    signatureInput: {
        flex: 1,
        minHeight: 60,
        fontSize: 16,
    },
    signatureInfo: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
        marginTop: 5,
    },
    // --- Estilos de Rádio Sexo ---
    radioRow: {
        flexDirection: 'row',
        gap: 10,
    },
    radioOption: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    radioOptionSelected: {
        backgroundColor: '#1E40AF', 
        borderColor: '#1E40AF',
    },
    radioText: {
        color: '#333',
        fontWeight: '500',
    },
    radioTextSelected: {
        color: '#fff',
        fontWeight: '600',
    }
});