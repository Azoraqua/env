import {EnvironmentType, getCurrentEnvironment, setCurrentEnvironment} from "./lib";

const { findEnvironmentFiles } = require('./lib');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

function main() {
    setCurrentEnvironment('PRODUCTION');

    yargs(hideBin(process.argv))
        // .command('switch', 'switch between environments', () => {
        //
        // })
        // .command('current', 'get/set the current environment', () => {}, (args: string[]) => {
            // if(!Object.values(args)[0]) {
            //     console.info(`The current environment is: ${getCurrentEnvironment()}`);
            // } else {
            //     setCurrentEnvironment(args[0][1] as EnvironmentType);
            //     console.log(`Changed the current environment to: ${args[0][1]}`)
            // }
        // })
        .command('list', 'list available environments', () => {
            console.log('Environment files:');
            findEnvironmentFiles().forEach((file: any, index: number) => {
                console.log(`${index + 1}) ${file}`);
            })
        })
        // .command('set', 'set variable in current environment', () => {}, (args: string[]) => {
        //
        // })
        // .command('get', 'get variable from current environment', () => {}, (args: string[]) => {
        //
        // })
        .demandCommand(1)
        .parse();
}

main();