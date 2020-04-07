import React from 'react';
import { StyleSheet } from 'react-native';

import useGlobalInfo from '../hooks/useGlobalInfo';
import DynamicScreen from '../components/DynamicScreen';
import Card from '../components/Card';

const GlobalScreen = () => {
  const {
    fetchGlobalInfo,
    cancel,
    isLoading,
    globalInfo,
    error,
  } = useGlobalInfo();

  const hasContent = Object.keys(globalInfo).length > 0;

  return (
    <DynamicScreen
      style={s.root}
      isLoading={isLoading}
      hasContent={hasContent}
      error={error}
      onEnter={fetchGlobalInfo}
      onLeave={cancel}
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
    paddingHorizontal: 10,
  },
  card: {
    marginTop: 10,
  },
});

export default GlobalScreen;
