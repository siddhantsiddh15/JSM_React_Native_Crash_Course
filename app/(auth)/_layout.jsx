import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
    return (
        <>
        <Stack>
            <Stack.Screen name="sign-in" 
            options={{
                headerShown: false,
            
            }}
            />
            <Stack.Screen name="sign-up" 
            options={{
                headerShown: false,
            
            }}
            />
        </Stack>
        <StatusBar style="light" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AuthLayout;
