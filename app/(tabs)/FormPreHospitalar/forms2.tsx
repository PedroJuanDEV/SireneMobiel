// app/(tabs)/FormPreHospitalar/forms2.tsx

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// A correção do caminho para a pasta 'components'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import FormContainer from './components/FormContainer';

// Componente de Campo Simples (Reutilizado)
const FormField: React.FC<{ label: string; placeholder: string; isSmall?: boolean; keyboardType?: 'numeric' | 'default' }> = ({ label, placeholder, isSmall = false, keyboardType = 'default' }) => (
    <View style={[styles.inputGroup, isSmall && styles.smallInputGroup]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} keyboardType={keyboardType} />
    </View>
);

// Componente para opções de Rádio/Seleção Única (Substituindo o CheckboxGroup original)
const ToggleGroup: React.FC<{ options: string[]; selectedValue: string; onSelect: (value: string) => void }> = ({ options, selectedValue, onSelect }) => (
    <View style={styles.toggleRow}>
        {options.map((option) => (
            <TouchableOpacity 
                key={option} 
                style={[
                    styles.toggleOption, 
                    selectedValue === option && styles.toggleOptionSelected // Usa selectedValue
                ]} 
                onPress={() => onSelect(option)}
            >
                <Text style={[styles.toggleText, selectedValue === option && styles.toggleTextSelected]}>{option}</Text>
            </TouchableOpacity>
        ))}
    </View>
);


export default function Forms2Natureza1() {
    const router = useRouter();
    // Mudança para string, pois 'IRM', 'SIU', 'NÃO' são geralmente seleção única.
    const [areaCBM, setAreaCBM] = useState<string>(''); 
    const [areaCBMisVazio, setAreaCBMisVazio] = useState<string>('');

    const handleAdvance = () => {
        // Lógica de validação aqui...
        router.push('/FormPreHospitalar/forms3'); 
    };

    const handleCancel = () => {
        router.back(); 
    };
    
    // A função agora define diretamente o valor (seleção única)
    const handleSelectAreaCBM = (value: string) => {
        setAreaCBM(value === areaCBM ? '' : value); // Alterna a seleção
    };

    return (
        <FormContainer
            currentStep={2}
            totalSteps={5}
            title="Forms2-Natureza 1"
            onAdvance={handleAdvance}
            onCancel={handleCancel}
            showAdvanceButton={true}
        >
            {/* Coordenadas */}
            <Text style={styles.sectionTitle}>Coordenadas</Text>

            {/* Linha 1: Latitude/Longitude */}
            <View style={styles.row}>
                <FormField label="Latitude" placeholder="-8.00000" isSmall keyboardType="numeric" />
                <FormField label="Longitude" placeholder="-34.00000" isSmall keyboardType="numeric" />
            </View>
            {/* Linha 2: Elevação/GPS */}
            <View style={styles.row}>
                <FormField label="Elevação/Altitude" placeholder="Ex: 50m" isSmall />
                <FormField label="Nº de GPS" placeholder="Ex: 123456" isSmall keyboardType="numeric" />
            </View>

            <TouchableOpacity style={styles.localizationButton}>
                <MaterialIcons name="my-location" size={20} color="#fff" />
                <Text style={styles.localizationText}>Localização atual</Text>
            </TouchableOpacity>


            {/* Área do CBM */}
            <Text style={styles.sectionTitle}>Área do CBM</Text>
            
            <View style={styles.rowAreaCBM}> 
                {/* 1. IRM/SIU/NÃO */}
                <View style={styles.cbmToggleWrapper}>
                    <Text style={styles.label}>Área</Text>
                    <ToggleGroup 
                        options={['IRM', 'SIU', 'NÃO']} 
                        selectedValue={areaCBM} 
                        onSelect={handleSelectAreaCBM}
                    />
                </View>
                
                {/* 2. Vazio (Sim/Não) */}
                <View style={styles.cbmVazioWrapper}>
                    <Text style={styles.label}>Vazio</Text>
                    <ToggleGroup 
                        options={['Sim', 'Não']} 
                        selectedValue={areaCBMisVazio} 
                        onSelect={setAreaCBMisVazio}
                    />
                </View>
            </View>
            
            {/* O campo de motivo só deve aparecer se 'Vazio: Sim' for selecionado, mas o deixaremos visível por enquanto. */}
            {areaCBMisVazio === 'Sim' && (
                <FormField label="Motivo da área de vazio" placeholder="Descreva o motivo" />
            )}

            {/* Fotos/Vídeos */}
            <Text style={styles.sectionTitle}>Fotos/Vídeos</Text>
            <View style={styles.mediaRow}>
                <TouchableOpacity style={styles.mediaButton}>
                    <FontAwesome name="camera" size={24} color="#1E40AF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mediaButton}>
                    <FontAwesome name="video-camera" size={24} color="#1E40AF" />
                </TouchableOpacity>
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
        color: '#1E40AF', 
    },
    // --- Estilos de Inputs ---
    inputGroup: {
        marginBottom: 10,
    },
    smallInputGroup: {
        flex: 1,
        marginRight: 10,
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
        marginBottom: 10,
        // Alinha os inputs no topo
        alignItems: 'flex-start', 
    },
    // --- Estilos de Localização ---
    localizationButton: {
        flexDirection: 'row',
        backgroundColor: '#1E40AF',
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        gap: 10,
    },
    localizationText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // --- Estilos de Toggle/Radio ---
    rowAreaCBM: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    cbmToggleWrapper: {
        flex: 1.5, // Dá mais espaço para os 3 botões
        marginRight: 10,
    },
    cbmVazioWrapper: {
        flex: 1,
        marginLeft: 10,
    },
    toggleRow: {
        flexDirection: 'row',
        gap: 5, // Espaçamento entre as opções
    },
    toggleOption: {
        backgroundColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        // Estilo específico para caber 3 itens (IRM, SIU, NÃO)
        flexGrow: 1, 
        alignItems: 'center',
    },
    toggleOptionSelected: {
        backgroundColor: '#1E40AF', 
        borderColor: '#1E40AF',
    },
    toggleText: {
        color: '#333',
        fontWeight: '500',
        fontSize: 12,
    },
    toggleTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    // --- Estilos de Mídia ---
    mediaRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    mediaButton: {
        borderWidth: 2,
        borderColor: '#1E40AF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
});