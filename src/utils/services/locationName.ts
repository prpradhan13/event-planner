import axios from 'axios';


export const locationName = async ({latitude,longitude}: {latitude?: number ,longitude?: number}) => {
    const API_KEY = process.env.EXPO_PUBLIC_MAP_API_KEY;

    if (!API_KEY) {
        throw new Error('API_KEY not specified')
    }

    try {
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`);

        return data?.results[0].address_components[0].short_name;

    } catch (error) {
        console.error(error);
    }
}