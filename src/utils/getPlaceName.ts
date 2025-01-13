import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const getPlaceName = ({latitude, longitude}) => {
    const apiKey = "AIzaSyAY_-eXu3UPp3wfjAtGDKKc7KziaWle9n8";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    
    return 
}

export default getPlaceName;
