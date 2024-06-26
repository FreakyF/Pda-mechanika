import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Naprawa from "./nadchodzace-naprawy-wizyta";
import Linia from "../../ui/Linia";
import Tytul from "../../ui/Tytul";
import Wizyta from "../nadchodzoace-wizyty/nadchodzace-wizyty-wizyta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LightSensor} from "expo-sensors";

function NadchodzaceNaprawyEkran({navigation}) {
    const [data, setData] = useState();

    const fetchData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("naprawy");
            jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            setData(jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderItem = ({item}) => <Naprawa navigation={navigation} item={item}/>;

    const [illuminance, setilluminance] = useState(26);
    const aktywnystyl = illuminance > 25 ? styles : Darkstyles;
    LightSensor.addListener(data => {setilluminance(data.illuminance)})
    return (
        <View style={aktywnystyl.container}>
            <Tytul text={"Nadchodzące naprawy"}/>
            <Linia text="Dzisiaj"/>
            <FlatList data={data} renderItem={renderItem}/>
        </View>
    )
}

export default NadchodzaceNaprawyEkran;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


const Darkstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
});