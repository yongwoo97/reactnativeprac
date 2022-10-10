import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
export default function App() {

    const [isLoading, setLoading] = useState(true);
    const [geo, setGeo] = useState([]);
    const [location_info, setLocation] = useState([{"city":"", "street":""}]);
    const [weather, setWeather] = useState();
    const getWeather = async(latitude, longitude) => {
        const { data } = await axios.get (
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3d328986457d6b23d5ff91e9ddccad53`
        );

        setWeather(data);
        console.log(data.main.temp);
    }


    const getLocation = async() => {
        try {
            await Location.requestForegroundPermissionsAsync();
            
            const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
            getWeather(latitude, longitude);
            const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
            setLocation(location);
            setGeo([latitude, longitude]);
            console.log(geo);
            
        }catch(error){
            Alert.alert("정보를 찾을 수 없습니다.");
        }
    }

    
    useEffect(() => {
        getLocation();
    }, []);
    


    

    return (<View style={{flex:1}}>
            <View style={styles.city}>
                <Text styrle={styles.cityName}>지역명 : {location_info[0].city + " " +location_info[0].street}</Text>
            </View>
            <View style={styles.scroll}>
                <ScrollView style={styles.weather}>
                <View style={styles.day}>
                    <Text style={[styles.temp, {marginBottom:30}]}>기온 : {weather ? ((weather.main.temp - 273)): "불러오는중"}</Text>
                    <Text style={styles.description}>위도: {geo ? geo[1] : ""}</Text>
                    <Text style={styles.description}>경도: {geo ? geo[0] : ""}</Text>
                </View>
        
                </ScrollView>
            </View>
            

    </View>);
    
}

const styles = StyleSheet.create({
    city: {
        flex:1,
        backgroundColor:"tomato",
        justifyContent:"center",
        alignItems: "center",
    },
    scroll: {
        flex:2,
    },
    cityName: {
        fontSize: 10,
        fontWeight: "500"
    },
    weather: {
        flex:2,
    },
    day: {

        alignItems: "center",
    },
    temp: {
        marginTop: 50,
        fontSize: 18,
    },
    description: {
        marginTop: 10,
        fontSize: 18,
    },
})