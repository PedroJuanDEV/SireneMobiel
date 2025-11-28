import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FormContainer from './components/FormContainer';

const FormField: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} />
  </View>
);

const RadioGroup: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <View style={styles.radioGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.radioOptions}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.radioOption,
                            selected === option && styles.radioOptionSelected
                        ]}
                        onPress={() => setSelected(option)}
                    >
                        <Text style={[
                            styles.radioText,
                            selected === option && styles.radioTextSelected
                        ]}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


export default function Forms1Natureza1() {
  const router = useRouter();

  const handleAdvance = () => {
    router.push('/FormPreHospitalar/forms2'); 
  };

  const handleCancel = () => {
    router.back(); 
  };

  return (
    <FormContainer
      currentStep={1}
      totalSteps={5}
      title="Forms1-Natureza 1"
      onAdvance={handleAdvance}
      onCancel={handleCancel}
      showAdvanceButton={true}
    >
        <Text style={styles.sectionTitle}>Forma de acionamento</Text>
        <FormField label="Tipo de Acionamento" placeholder="Ex: 193" />
        <FormField label="CM" placeholder="Ex: CBM" />
        <FormField label="CBmTA" placeholder="Ex: 12345" />

        <RadioGroup label="Forma de acionamento" options={['COI de agrupamento', 'Pessoalmente', 'CODIS', 'Outros']} />
        
        <Text style={styles.sectionTitle}>Situação da ocorrência</Text>
        <RadioGroup label="Situação" options={['Atendido', 'Transtorno', 'Cancelado']} />
        
        <Text style={styles.sectionTitle}>Local de acionamento</Text>
        <RadioGroup label="Local" options={['Ponto certo', 'Retornar ao ponto zero', 'Sem atuação motivo...', 'Imediatamente após finalizar anterior', 'Outros...']} />


        <TextInput style={styles.input} placeholder="Preencha o campo 'Outros'" />

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
    inputGroup: {
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
    radioGroup: {
        marginBottom: 15,
    },
    radioOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    radioOption: {
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 8,
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