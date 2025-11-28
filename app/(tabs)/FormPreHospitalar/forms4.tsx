// app/(tabs)/FormPreHospitalar/forms4.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Ajuste o caminho de importação para a nova subpasta 'components'
import FormContainer from './components/FormContainer';

// Componente para Opções (Sim/Não)
const OptionGroup: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    const [selected, setSelected] = React.useState('');

    return (
        <View style={styles.optionGroup}>
            <Text style={styles.optionLabel}>{label}</Text>
            <View style={styles.optionRow}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selected === option && styles.optionSelected
                        ]}
                        onPress={() => setSelected(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            selected === option && styles.optionTextSelected
                        ]}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


// Componente de Campo Simples (Reutilizado)
const FormField: React.FC<{ label: string; placeholder: string; fullWidth?: boolean }> = ({ label, placeholder, fullWidth = false }) => (
  <View style={[styles.inputGroup, fullWidth && { width: '100%' }]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} />
  </View>
);

export default function Forms4Natureza1() {
  const router = useRouter();

  const handleAdvance = () => {
    // Navega para a próxima etapa
    router.push('/FormPreHospitalar/forms5'); 
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <FormContainer
      currentStep={4} // Etapa 4
      totalSteps={5}
      title="Forms4-Natureza 1"
      onAdvance={handleAdvance}
      onCancel={handleCancel}
      showAdvanceButton={true}
      advanceText='Avançar'
    >
        {/* Atendimento (Anamnese) */}
        <Text style={styles.sectionTitle}>Atendimento</Text>
        <TextInput
            style={styles.largeInput}
            placeholder="Descrição detalhada do atendimento (Anamnese, Sinais Vitais, etc.)"
            multiline
            numberOfLines={4}
        />
        
        <Text style={styles.sectionSubtitle}>EVENTO - Natureza inicial do sinistro</Text>
        <TextInput
            style={styles.input}
            placeholder="Ex: Queda de moto, Mal súbito"
        />

        {/* Tipo de Vítima / Informações Adicionais */}
        <Text style={styles.sectionTitle}>Tipo de vítima</Text>
        
        <View style={styles.row}>
            <FormField label="Gravidade da Vítima" placeholder="Ex: Vermelho, Amarelo" />
            <FormField label="Prioridade" placeholder="Ex: Imediata, Retardada" />
        </View>

        {/* Linha de Opções (Simulando botões da imagem) */}
        <View style={styles.optionRowContainer}>
            <OptionGroup label="" options={['Pedestre', 'Condutor', 'Passageiro']} />
        </View>
        <View style={styles.optionRowContainer}>
            <OptionGroup label="" options={['Motocicleta', 'Automóvel', 'Ciclista']} />
        </View>
        <View style={styles.optionRowContainer}>
            <OptionGroup label="" options={['Outros', 'Nenhum']} />
        </View>
        

    </FormContainer>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        color: '#1E40AF', // Azul
    },
    sectionSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
        color: '#333',
    },
    inputGroup: {
        flex: 1, // Permite que os campos na linha ocupem o mesmo espaço
        marginBottom: 10,
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
    largeInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        minHeight: 100,
        textAlignVertical: 'top', // Para que o texto comece no topo em multiline
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
    },
    // --- Estilos de Opções (Tipo de Vítima) ---
    optionRowContainer: {
        marginBottom: 10,
    },
    optionGroup: {
        // Não precisamos de label aqui, mas mantemos o contêiner
    },
    optionLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    optionSelected: {
        backgroundColor: '#1E40AF', // Azul Escuro
        borderColor: '#1E40AF',
    },
    optionText: {
        color: '#333',
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#fff',
        fontWeight: '600',
    }
});