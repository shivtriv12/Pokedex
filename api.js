import axios from "axios";

async function fetchLocations(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
        return null;
    }
}

export {fetchLocations};