#!/usr/bin/env node

// Imports
const fs = require('fs');
const path = require('path');

// Constants
const CACHE_FOLDER = ".qenvcache";

type EnvFileType =
    '.env' |
    '.env.local' |
    '.env.prod' |
    '.env.production' |
    '.env.dev' |
    '.env.development';
const ENV_FILES: EnvFileType[] = ['.env', '.env.local', '.env.production', '.env.development'];

function loadEnv(file: EnvFileType) {
    if (!fs.existsSync(file)) {
        return;
    }

    for (const line of fs.readFileSync(file).toString().split(/\r?\n/)) {
        const parts = line.split('=');
        const key = parts[0];
        const value = parts[1];

        process.env[key] = value;
    }
}

function init(args = process.argv.slice(2)): number {
    if (args.length === 0) {
        // TODO: Send help.
        return -1;
    }

    if (args[0]) {
        if (!ENV_FILES.some(f => f === args[0])) {
            console.warn('It\'s discouraged to use environment files with this name. However we\'ll continue the process.');
        }

        loadEnv(args[0] as EnvFileType);
    } else {
        // Priority:
        // .envq.production
        // .envq.development
        // .envq.local
        // .envq

        let file;

        if (
            fs.existsSync(file = '.env.production') ||
            fs.existsSync(file = '.env.development') ||
            fs.existsSync(file = '.env.local') ||
            fs.existsSync(file = '.env') &&
            file
        ) {
            loadEnv(file as EnvFileType);
        } else {
            console.error('No environment files found.');
        }
    }

    for (let key in process.env) {
       if (key.startsWith('X_')) {
           console.log(key, '=', process.env[key]);
       }
    }

    return 0;
}

process.exit(init());