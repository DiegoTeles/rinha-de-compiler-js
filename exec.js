const fs = require("fs");

const interpreterAST = require("./interpreter");
const filePath = "./var/rinha/source.rinha.json";

function executeInterpreter(file, initialValueEnv = {}) {
  try {
    const fileResult = fs.readFileSync(file, "utf8");
    const json = JSON.parse(fileResult);

    return interpreterAST(json.expression, { ...initialValueEnv });
  } catch (error) {
    console.error("Erro ao executar o código:", error.message);
    return null;
  }
}

const start = process.hrtime();
executeInterpreter(filePath);
const diff = process.hrtime(start);
const nanoseconds = diff[0] * 1e9 + diff[1];
const seconds = nanoseconds / 1e9;
console.log(`Interpreter Exec. Time in: ${seconds.toFixed(2)} segundos`);
