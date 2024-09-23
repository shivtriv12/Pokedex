import { Command } from 'commander';

const program = new Command();

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

const helpCmd = program.command('help');
helpCmd
    .description('Display help msg')
    .action(() => {
        program.outputHelp();
    });

export default program;