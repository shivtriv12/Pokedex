import { Command } from 'commander';
import { fetchLocations } from './api.js';

const program = new Command();
const config = {
    next: null,
    previous: null
};
const limit = 20;

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
export default program;