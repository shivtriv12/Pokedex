import { start } from 'repl';
import program from './commands.js';

program.exitOverride();

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