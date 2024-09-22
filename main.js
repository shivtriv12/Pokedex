import {Command} from "commander";
import {start} from 'repl';

const program = new Command();

program
    .name('Pokedex')
    .description('REPL CLI for Pokedex')
    .version('1.0.0')

const exitCmd = program.command('exit');
const heplCmd = program.command('help');
exitCmd
    .description('To exit this repl')
    .action(()=>{
        process.exit(0);
    });
heplCmd
    .description('Display help msg')
    .action(() => {
        program.outputHelp();
    });
      
program.exitOverride();
exitCmd.exitOverride();
heplCmd.exitOverride();

start({
    prompt: 'Pokedex> ',
    ignoreUndefined: true,
    eval: (cmd, context, filename, callback) => {
      const args = cmd.trim().split(' ');
      if (args.includes('-h') || args.includes('--help')) {
        program.outputHelp();
        callback(null);
        return;
      }
      if (args.includes('-V') || args.includes('--version')) {
        console.log(program.version());
        callback(null);
        return;
      }
      try {
        program.parseAsync(args, { from: 'user' });
        callback(null, undefined);              
      } catch (err) {                            
        callback(null, undefined);
      }
    }
});

/*
import { start } from 'repl';

const helpMessage = `
Welcome to the Pokedex!
Usage:

help: Displays a help message
exit: Exit the Pokedex
`;

const startREPL = () => {
  console.log('Pokedex >');

  start({
    prompt: 'Pokedex > ',
    eval: (cmd, context, filename, callback) => {
      const input = cmd.trim();

      if (input === 'help') {
        callback(null, helpMessage);
      } else if (input === 'exit') {
        console.log('Exiting the Pokedex...');
        process.exit(0);
      } else {
        callback(null, `Unknown command: ${input}`);
      }
    }
  });
};

startREPL();

*/