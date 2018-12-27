#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import {Command} from 'commander';
import {red, green} from 'chalk';
import md5 from 'md5';

class ResMap {
  constructor(folder, output) {
    this.folder = folder;
    this.output = output;
  }

  walkSync(dir) {
    return fs.statSync(dir).isDirectory()
        ? Array.prototype.concat(...fs.readdirSync(dir).map(f => this.walkSync(path.join(dir, f))))
        : dir;
  }

  generate() {
    let mapList = [];
    const fileList = this.walkSync(this.folder);
    for(const file of fileList) {
      try{
        const relativeFileName = path.relative(path.dirname(this.folder), file);
        const md5Val = md5(fs.readFileSync(file));
        mapList.push({
          file: relativeFileName,
          md5: md5Val
        });
      } catch(err) {
        console.error(red('Error: reading file `' + path.join(this.folder, file) + '`, ' + err));
        process.exit(-1);
      }
    }

    fs.writeFile(this.output, JSON.stringify(mapList), err => {
      if(err) {
        console.error(red('Error: writing file `' + this.output + '`, ' + err));
        process.exit(-1);
      }
      
      console.log(green(this.output + ' written successfully'));
    });
  }
}

const program = new Command();
let resFolder;

program
  .arguments('[folder]')
  .option('-o, --output [output]', 'Output file name')
  .action((folder) => {
    resFolder = folder;
  })
  .parse(process.argv);

if(resFolder === null || typeof resFolder === 'undefined') {
  console.error(red('Error: resource folder is no specified!'));
  process.exit(-1);
}

let outputFileName = path.basename(resFolder) + '.map.json';
if(program.output) {
  outputFileName = path.basename(program.output, path.extname(program.output)) + '.map.json';
}

try { 
  const state = fs.statSync(resFolder);
  if(!state || !state.isDirectory) {
    console.error(red('Error: folder `' + resFolder + '` does not exist'));
    process.exit(-1);
  }
} catch(error) {
  console.error(red('Error: `' + resFolder + '` is not a valid folder'));
  process.exit(-1);
}

const resmap = new ResMap(resFolder, outputFileName);
resmap.generate();