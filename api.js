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

async function fetchPokemonInArea(areaName) {
    const url = `https://pokeapi.co/api/v2/location-area/${areaName}`;
    const cached = cache.get(url);
    
    if (cached.found) {
        console.log('Serving from cache:', url);
        return JSON.parse(cached.data);
    }
    
    try {
        const response = await axios.get(url);
        cache.add(url, JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for area: ${areaName}`, error);
        return null;
    }
}

async function fetchPokemon(pokemonName) {
    const cached = cache.get(pokemonName.toLowerCase());
    if (cached.found) {
        console.log('Serving from cache for Pokémon:', pokemonName);
        return JSON.parse(cached.data);
    }
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        cache.add(pokemonName.toLowerCase(), JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(`Error fetching Pokémon data: ${error}`);
        return null;
    }
}

export {fetchLocations,fetchPokemonInArea,fetchPokemon};