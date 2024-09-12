import { Command } from "commander";
import { parseToJSON } from "../helpers/parse.js";

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('filepath1', 'path input file1')
  .argument('filepath2', 'path input file2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const object1 = parseToJSON(filepath1);
    const object2 = parseToJSON(filepath2);
  })

program.parse(process.argv);
