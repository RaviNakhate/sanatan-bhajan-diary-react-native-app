import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
import { URL } from "../utils/bhajans";


const Listing = ({ val: { id, bhajans } }) => {
  const navigation = useNavigation();
  const categoryId = id;


  return (
    <ScrollView >
      <View style={styles.storyContainer}>

        {bhajans.length == 0 &&
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No Record Found</Text>
          </View>
        }
        {bhajans.map((ele, key) => {
          return (
            <TouchableOpacity key={key}
              style={[styles.storyItem, key % 2 !== 0 && styles.oddStoryItem]}
              onPress={() => navigation.navigate('read', { categoryId, bhajanId: ele.id })}>
              <Text
                style={styles.titleText}
                numberOfLines={1}>
                {ele.title}
              </Text>
            </TouchableOpacity>)
        })}
      </View>
    </ScrollView>
  );
};

const Story = () => {
  const [loading, setLoading] = useState(false);
  const [bhajansData, setBhajansData] = useState([{ "_id": "65f094d0492898dc15630163", "bhajans": [[Object]], "category": "shiv", "id": 1, "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1tYZU1zo-i36AEX6CpONWyBW1kvcCiGpIt1vIGqFfR5kzaFYQFho1w9mKFhsTmVheV7QkFNNmVtKnlWuFIssNHlkr6lREP79AIMrfXfnsOP4zL4w59szx3QLk6pDB93aB-IZ22It-9XpAJ0BZHzeHdDggkPdKXJtCa-Cw6EfPfQoLf67zFilLU49eQM0/s1600/shiv.png" }]);

  useEffect(() => {
    fetchBhajans();
  }, []);


  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URL}/bhajans`);
      const data = await response.json();
      setBhajansData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render loading indicator
        <View style={styles.container}><ActivityIndicator style={styles.loadingIndicator} size='big' color="#408ee0" />
        </View>) : <Tab.Navigator
          pressColor='transparent'
          screenOptions={{
            pressColor: 'transparent',
            tabBarIndicatorStyle: { opacity: 0 },
            tabBarScrollEnabled: true,
            tabBarItemStyle: { width: 100, height: 90, pressColor: 'transparent' }
          }}
        >
        {bhajansData.map(({ id, category, image, bhajans }, key) => {
          return (
            <Tab.Screen
              key={key}
              name={category}
              children={() => <Listing val={{ id, bhajans }} />}
              options={{
                tabBarStyle: { marginBottom: 0 },
                tabBarLabel: '',
                tabBarIcon: ({ focused }) => (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 80,
                        height: 80,
                        borderWidth: 2,
                        borderRadius: 60,
                        resizeMode: 'contain',
                        borderWidth: focused ? 3 : 1,
                        borderColor: focused ? 'orange' : 'black',
                      }}
                    />
                  </View>
                )
              }}
            />
          )
        })}
      </Tab.Navigator>}

    </>
  )
}

export default Story

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    flexDirection: 'column',
  },
  storyItem: {
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  oddStoryItem: {
    backgroundColor: '#ececec'
  },
  titleText: {
    fontSize: 16,
  },

});