// app/_layout.tsx

import { Stack } from "expo-router";
import React from 'react';

export default function RootLayout() {
  return (
    <Stack 
      // 🎯 DEFININDO A TELA INICIAL:
      initialRouteName="Carregamento" 
      
      screenOptions={{ headerShown: false }}
    >
      {/* 1. Carregamento.tsx - Esta será a primeira tela a ser exibida */}
      <Stack.Screen 
        name="Carregamento" 
        options={{ title: 'Carregando' }}
      />
      
      {/* 2. Login.tsx */}
      <Stack.Screen 
        name="Login" 
        options={{ title: 'Login' }}
      />
      
      {/* 3. RecuperarSenha1.tsx */}
      <Stack.Screen 
        name="RecuperarSenha1" 
        options={{ title: 'Recuperar Senha - Etapa 1' }}
      />
      
      {/* 4. RecuperarSenha2.tsx */}
      <Stack.Screen 
        name="RecuperarSenha2" 
        options={{ title: 'Recuperar Senha - Etapa 2' }}
      />
      
    </Stack>
  );
}