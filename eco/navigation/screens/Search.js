import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://192.168.1.100:3000/search?term=${searchTerm}`);
      const { data } = response;
      onSearch(Array.isArray(data) ? data : [data]); // Ensure data is an array
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  };

  return (
    <View>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter search term"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default Search;
