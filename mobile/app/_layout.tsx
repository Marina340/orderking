import { Stack } from 'expo-router';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import React from 'react';

export default function RootLayout() {
  return (
    <AuthProvider children={
      <CartProvider children={
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      } />
    } />
  );
}
