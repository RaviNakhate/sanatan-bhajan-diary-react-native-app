import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { URL } from "../utils/bhajans";


const Search = () => {
  const inputRef = React.createRef();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBhajans();
  }, [search]);


  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/bhajan?bhajanTitle=${search}`);
      const data = await response.json();

      // const data = await response.json();
      setSearchData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const clearSearch = () => {
    setSearch('');
    setSearchData([]);
  };

  const handlePress = (item) => {
    if (item?.id && item.bhajan?.id) {
      navigation.navigate('read', { categoryId: item.id, bhajanId: item.bhajan.id });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
          <Icon name="arrow-left" size={24} color="grey" style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search Bhajans in Hindi..."
            value={search}
            onChangeText={(text) => { handleSearch(text) }}
            ref={inputRef}
            selectionColor="black"
          />
          {search.trim() !== '' && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Icon name="times" size={24} color="grey" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {loading ? ( // Conditionally render loading indicator
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#408ee0" />
      ) : ""}
      {
        !loading && !searchData?<Text style={styles.noRecordText}>No Record</Text>:""
      }
      <FlatList
        data={searchData}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={({ item }) => {
          return !item.bhajan?.title ? "" :
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Text style={styles.item}>{item?.bhajan?.title}</Text>
            </TouchableOpacity>
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  input: {
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    borderRadius: 15,
    borderColor: 'gray',
    borderWidth: 1,
  },
  clearButton: {
    padding: 8,
    zIndex: 2,
    position: 'absolute',
    right: 5
  },
  item: {
    padding: 16,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
