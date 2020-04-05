import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useGlobalInfo from "../hooks/useGlobalInfo";

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

    return (
        <View style={s.root}>
            <View style={{ flexDirection: 'row' }}>
                <Button
                    title="fetch"
                    onPress={fetchGlobalInfo}
                />

                <Button
                    title="cancel"
                    onPress={cancel}
                />
            </View>

            {isLoading &&
                <Text>isLoading</Text>
            }

            {error &&
                <Text>has error</Text>
            }

            {globalInfo &&
                <Text>{JSON.stringify(globalInfo)}</Text>
            }
        </View>
    );
};

const s = StyleSheet.create({
    root: {
        flex: 1
    }
});

export default GlobalScreen;
