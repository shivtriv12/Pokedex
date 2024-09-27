import { Command } from 'commander';
import { fetchLocations,fetchPokemonInArea,fetchPokemon } from './api.js';

const program = new Command();
const config = {
    next: null,
    previous: null
};
const limit = 20;
const caughtPokemons = new Map();
program
    .name('Pokedex')
    .description('REPL CLI for Pokedex')
    .version('1.0.0');

const exitCmd = program.command('exit');
exitCmd
    .description('To exit this repl')
    .action(() => {
        process.exit(0);
    });

program
    .command('map')
    .description('Show next 20 location areas')
    .action(async () => {
        const url = config.next || `https://pokeapi.co/api/v2/location-area/?limit=${limit}`;
        const data = await fetchLocations(url);

        if (data) {
            config.next = data.next;
            config.previous = data.previous;

            console.log('Next 20 locations:');
            data.results.forEach((location, index) => {
                console.log(`${index + 1}. ${location.name}`);
            });
        } else {
            console.log('No more locations available.');
        }
    });
program
    .command('mapb')
    .description('Show previous 20 location areas')
    .action(async () => {
        if (config.previous) {
            const data = await fetchLocations(config.previous);
            if (data) {
                config.next = data.next;
                config.previous = data.previous;

                console.log('Previous 20 locations:');
                data.results.forEach((location, index) => {
                    console.log(`${index + 1}. ${location.name}`);
                });
            }
        } else {
            console.log('You are already at the beginning of the list.');
        }
    });

program
    .command('explore <area_name>')
    .description('Explore a location area to find Pokémon')
    .action(async (areaName) => {
        const data = await fetchPokemonInArea(areaName);

        if (data) {
            console.log(`Pokémon found in ${areaName}:`);
            data.pokemon_encounters.forEach((encounter, index) => {
                console.log(`${index + 1}. ${encounter.pokemon.name}`);
            });
        } else {
            console.log('No Pokémon data available for this area.');
        }
    });

program
    .command('catch <pokemon_name>')
    .description('Catch a Pokémon by name')
    .action(async (pokemonName) => {
        const data = await fetchPokemon(pokemonName.toLowerCase());

        if (!data) {
            console.log(`Pokémon ${pokemonName} not found.`);
            return;
        }

        const baseExperience = data.base_experience;
        const catchChance = Math.random();
        const probability = Math.max(0.1, 1 - baseExperience / 100);

        console.log(`Throwing a Pokéball at ${data.name}...`);

        if (catchChance <= probability) {
            caughtPokemons.set(data.name.toLowerCase(), {
                name: data.name,
                height: data.height / 10, 
                weight: data.weight / 10,
                stats: {
                    hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                    attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                    defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
                    specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
                    specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
                    speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
                },
                types: data.types.map(type => type.type.name),
            });
            console.log(`${data.name} was caught!`);
        } else {
            console.log(`Oh no! ${data.name} escaped!`);
        }
    });

program
    .command('inspect <pokemon_name>')
    .description('Inspect a Pokémon you have caught')
    .action((pokemonName) => {
        const pokemon = caughtPokemons.get(pokemonName.toLowerCase());

        if (pokemon) {
            console.log(`Name: ${pokemon.name}`);
            console.log(`Height: ${pokemon.height} m`);
            console.log(`Weight: ${pokemon.weight} kg`);
            console.log('Stats:');
            console.log(`  - hp: ${pokemon.stats.hp}`);
            console.log(`  - attack: ${pokemon.stats.attack}`);
            console.log(`  - defense: ${pokemon.stats.defense}`);
            console.log(`  - special-attack: ${pokemon.stats.specialAttack}`);
            console.log(`  - special-defense: ${pokemon.stats.specialDefense}`);
            console.log(`  - speed: ${pokemon.stats.speed}`);
            console.log('Types:');
            console.log(`  - ${pokemon.types.join('\n  - ')}`);
        } else {
            console.log(`You haven't caught a Pokémon named "${pokemonName}".`);
        }
    });

program
    .command('pokedex')
    .description('List all caught Pokémon')
    .action(() => {
        if (caughtPokemons.size === 0) {
            console.log('You haven\'t caught any Pokémon yet.');
            return;
        }

        console.log('Caught Pokémon:');
        caughtPokemons.forEach(pokemon => {
            console.log(`- ${pokemon.name}`);
        });
    });

export default program;