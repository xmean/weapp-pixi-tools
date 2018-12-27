#!/usr/bin/env node

import {Command} from 'commander';
 
const program = new Command();
program
  .command('resmap [folder]', 'Generate asset map file for a given resource folder')
  .command('command', 'list of supported commands', {isDefault: true})
  .parse(process.argv);