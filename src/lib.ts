const fs = require('fs');
const path = require('path');

export type EnvironmentType = 'PRODUCTION' | 'DEVELOPMENT' | 'LOCAL';
export type EnvironmentFileType = '.env.production' | '.env.development' | '.env.local' | '.env';

const ENVIRONMENT_FILE_PATTERN = /\.env(\.(production|development|local))?/;
const ENVIRONMENT_FILE_ORDER = ['.env.production', '.env.development', '.env.local', '.env'];
const ENVIRONMENT_CACHE = '.qenvcache';
const ENVIRONMENT_CFG = 'config.json';

type Config = {
    current: EnvironmentType;
}

function __createConfig() {
    const cp = path.join(ENVIRONMENT_CACHE);
    const cfp = path.join(ENVIRONMENT_CACHE, ENVIRONMENT_CFG);

    if (cp && !fs.existsSync(cp)) {
        fs.mkdirSync(cp);
    }

    if (cfp && !fs.existsSync(cfp)) {
        fs.writeSync(fs.openSync(cfp, 'w'), Buffer.from(JSON.stringify({
            current: 'PRODUCTION'
        } as Config, null, 4)));
    }
}

export function setCurrentEnvironment(current: EnvironmentType) {
    __createConfig();

    const cfp = path.join(ENVIRONMENT_CACHE, ENVIRONMENT_CFG);

    fs.writeSync(fs.openSync(cfp, 'w'), JSON.stringify({
        current: current
    }));
}

export function getCurrentEnvironment(): EnvironmentType {
    return (JSON.parse(fs.readFileSync(path.join(ENVIRONMENT_CACHE, ENVIRONMENT_CFG)).toString())
        .current) as EnvironmentType;
}

export function setEnvironmentVariable(key: string, value: string) {

}

export function findEnvironmentFiles(folder: string = '.'): string[] {
    return fs.readdirSync(folder)
        .filter((f: string) => ENVIRONMENT_FILE_PATTERN.test(f))
        .sort((a: string, b: string) => ENVIRONMENT_FILE_ORDER.indexOf(a) - ENVIRONMENT_FILE_ORDER.indexOf(b));
}