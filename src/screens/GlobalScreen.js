import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import useGlobalInfo from "../hooks/useGlobalInfo";
import DynamicScreen from '../components/DynamicScreen';
import Card from '../components/Card';
import Colors from '../constants/Colors';


const GlobalScreen = ({  }) => {
    const {
        fetchGlobalInfo,
        cancel,
        isLoading,
        globalInfo,
        error
    } = useGlobalInfo();

    useFocusEffect(
        useCallback(() => {
            fetchGlobalInfo();

            return cancel;
        }, [])
    );

    const hasContent = Object.keys(globalInfo).length > 0;

    return (
        <DynamicScreen
            style={s.root}
            isLoading={isLoading}
            hasContent={hasContent}
            error={error}
        >
            <Card
                style={s.card}
                name="Global"
                title="Coronavirus cases"
                value={globalInfo.cases}
            />

            <Card
                style={s.card}
                name="Global"
                title="Deaths"
                value={globalInfo.deaths}
            />

            <Card
                style={s.card}
                name="Global"
                title="Recovered"
                value={globalInfo.recovered}
            />
        </DynamicScreen>
    );
};

const s = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: Colors.black
    },
    card: {
        marginTop: 10
    }
});

export default GlobalScreen;
