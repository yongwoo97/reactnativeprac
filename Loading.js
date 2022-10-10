import React, { useState } from 'react';
import { View, Text, StyleSheet} from "react-native";
import {StatusBar} from 'expo-status-bar';


export default function Loading() {
    return (
        <View style = {StyleSheet.container}>

            <StatusBar barStyle="dark-content">
            </StatusBar>
            <Text style = {StyleSheet.text}>
                Getting the current weather!
            </Text>
        </View>
    )
}