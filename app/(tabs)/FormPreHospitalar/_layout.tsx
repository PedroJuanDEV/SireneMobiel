// app/(tabs)/FormPreHospitalar/_layout.tsx

import { Stack } from 'expo-router';

export default function FormPreHospitalarLayout() {
  return (
    // Stack é o tipo de navegador que empilha telas, ideal para formulários sequenciais.
    <Stack 
        screenOptions={{ 
            // O FormContainer que criamos já desenha o cabeçalho, então podemos esconder o padrão:
            headerShown: false 
        }}
    >
      
      {/* Etapa 1: Ponto de entrada da pilha */}
      <Stack.Screen 
        name="forms1" 
        options={{ title: 'Etapa 1: Acionamento' }} 
      /> 
      
      {/* Etapas 2, 3, 4 e 5 */}
      <Stack.Screen 
        name="forms2" 
        options={{ title: 'Etapa 2: Coordenadas e Mídia' }} 
      />
      <Stack.Screen 
        name="forms3" 
        options={{ title: 'Etapa 3: Controle e Assinatura' }} 
      />
      <Stack.Screen 
        name="forms4" 
        options={{ title: 'Etapa 4: Atendimento e Vítima' }} 
      />
      <Stack.Screen 
        name="forms5" 
        options={{ title: 'Etapa 5: Veículos e Guarnição' }} 
      />

    </Stack>
  );
}