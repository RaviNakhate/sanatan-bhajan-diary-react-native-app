import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../component/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { URL } from "../utils/bhajans";

const Read = ({ route }) => {
  useEffect(() => {
    fetchBhajan();
  }, []);

  const fetchBhajan = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/bhajan/${categoryId}/${bhajanId}`);
      const data = await response.json();
      setBhajanData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { bhajanId, categoryId } = route.params;
  const [bhajanData, setBhajanData] = useState({});

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [fontSize, setFontSize] = useState(16);
  const handleZoomIn = () => {
    setFontSize((prevSize) => Math.min(22, prevSize + 1)); // Increase font size by 2
  };

  const handleZoomOut = () => {
    setFontSize((prevSize) => Math.max(12, prevSize - 1)); // Decrease font size by 2, with a minimum of 12
  };
  return (
    <>
      <Header />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: 'white' }}>
        <TouchableOpacity style={[styles.iconBack, { padding: 2, paddingRight: 25 }]} onPress={() => navigation.goBack()} >
          <Icon name="arrow-left" size={24} color='grey' />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.iconMinus} onPress={handleZoomOut}>
            <Icon name="search-minus" size={30} color='grey' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconPlus} onPress={handleZoomIn}>
            <Icon name="search-plus" size={30} color='grey' />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? <View style={styles.loadingContainer}><ActivityIndicator style={styles.loadingIndicator} size='big' color="#408ee0" />
      </View> : <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>{bhajanData.title}</Text>
          <Text style={[styles.bhajanText, { fontSize }]}>{bhajanData.desc}</Text>
        </ScrollView>
      </View>}

    </>
  )
}

export default Read

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    padding: 2,
    backgroundColor: '#fff',
    marginBottom: 100
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  bhajanText: {
    textAlign: "center",
    lineHeight: 28.5,
  },
  iconBack: {
    margin: 5,
    marginLeft: 7,
  },
  iconPlus: {
    marginRight: 12,
    marginLeft: 25
  }
});