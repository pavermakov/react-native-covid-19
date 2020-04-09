import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import DynamicContent from '../components/DynamicContent';
import SearchBar from '../components/SearchBar';
import useAllCountriesInfo from '../hooks/useAllCountriesInfo';
import Colors from '../constants/Colors';

const keyExtractor = (item) => item.country;

const CountriesScreen = () => {
  const {
    fetchAllCountriesInfo,
    cancel,
    isLoading,
    allCountriesInfo,
    error,
  } = useAllCountriesInfo();

  const [search, setSearch] = useState('');
  const filteredCountries = allCountriesInfo.filter((item) => item.country.toLowerCase().includes(search));

  const cleanup = () => {
    cancel();
    setSearch('');
  };

  return (
    <Screen
      style={s.root}
      onEnter={fetchAllCountriesInfo}
      onLeave={cleanup}
    >
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <DynamicContent
        isLoading={isLoading}
        hasContent={filteredCountries.length > 0}
        error={error}
      >
        <FlatList
          data={filteredCountries}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (

            <View style={s.country}>
              <View style={s.wrapper}>
                <Text style={[s.text, s.textLarge, s.textWhite]}>
                  {item.country}
                </Text>

                <Text style={s.text}>
                  {`Cases: ${item.cases} | Today: ${item.todayCases} | Active: ${item.active}`}
                </Text>

                <Text style={s.text}>
                  {`Deaths: ${item.deaths} | Today: ${item.todayDeaths}`}
                </Text>

                <Text style={s.text}>
                  {`Recovered: ${item.recovered} | Critical: ${item.critical}`}
                </Text>
              </View>
            </View>

          )}
        />
      </DynamicContent>
    </Screen>
  );
};

const s = StyleSheet.create({
  root: {

  },

  country: {
    backgroundColor: '#1a1b1f',
    paddingLeft: 15,
  },
  wrapper: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(125, 125, 127, 0.1)',
  },
  text: {
    fontSize: 14,
    color: '#7d7d7f',
  },
  textWhite: {
    color: Colors.white,
  },
  textLarge: {
    fontSize: 24,
  },
});

export default CountriesScreen;
