// app/(tabs)/_layout.tsx

import { AntDesign, Ionicons } from '@expo/vector-icons'; // Instale: expo install @expo/vector-icons
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const primaryColor = '#550D08';

// Componente customizado para o botão central grande (com o símbolo de '+')
const CentralPlusButton: React.FC<any> = ({ focused }) => (
  <TouchableOpacity style={styles.plusButtonContainer}>
    <View style={styles.plusButton}>
      <AntDesign name="plus" size={30} color="#FFF" />
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta o header padrão do navegador
        tabBarShowLabel: false, // Oculta os rótulos de texto
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* 1. Início / Home */}
      <Tabs.Screen
        name="index" // Corresponde ao app/(tabs)/index.tsx (Tela Inicial)
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 2. Ocorrências (Documento) */}
      <Tabs.Screen
        name="Ocorrencias" // Crie o arquivo app/(tabs)/Ocorrencias.tsx
        options={{
          title: 'Ocorrências',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 3. Botão Central (Oculto, usando tabBarButton customizado) */}
      <Tabs.Screen
        name="Novo" // Rota para criar nova ocorrência
        options={{
          title: 'Novo',
          tabBarButton: (props) => <CentralPlusButton {...props} />, // Usa o componente customizado
        }}
      />
      
      {/* 4. Localização / Mapa */}
      <Tabs.Screen
        name="Mapa" // Crie o arquivo app/(tabs)/Mapa.tsx
        options={{
          title: 'Mapa',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />

      {/* 5. Perfil / Usuário */}
      <Tabs.Screen
        name="Perfil" // Crie o arquivo app/(tabs)/Perfil.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={focused ? primaryColor : '#888'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    borderTopWidth: 0,
    backgroundColor: '#FFF',
    // Adiciona o efeito arredondado na base da tab bar
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    overflow: 'hidden', // Para ajudar a cortar
  },
  plusButtonContainer: {
    top: -20, // Move o botão para cima
    justifyContent: 'center',
    alignItems: 'center',
    width: 70, 
    height: 70,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF', // Fundo branco
    justifyContent: 'center',
    alignItems: 'center',
    // Borda marrom
    borderColor: primaryColor,
    borderWidth: 2,
    // Sombra (Opcional, pode variar no Android/iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});