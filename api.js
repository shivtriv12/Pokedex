import axios from "axios";
import { newCache } from "./pokecache.js";

const cache = newCache(300000);

async function fetchLocations(url) {
    const cached = cache.get(url);
    if (cached.found) {
        console.log('Serving from cache:');
        return JSON.parse(cached.data);
    }
    try {
        const response = await axios.get(url);
        cache.add(url, JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
        return null;
    }
}

export {fetchLocations};