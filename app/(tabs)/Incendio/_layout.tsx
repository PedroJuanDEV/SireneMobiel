// app/(tabs)/incendio/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function IncendioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forms1" options={{ title: 'Incêndio - Etapa 1' }} />
      <Stack.Screen name="forms2" options={{ title: 'Incêndio - Etapa 2' }} />
      {/* Adicione as outras etapas aqui: forms3, forms4, etc. */}
    </Stack>
  );
}