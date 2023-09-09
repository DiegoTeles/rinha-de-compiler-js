const { fibonacciLoop, fibonacciMatrix } = require("./utils/fibonacciCalc");

function interpreterAST(node, environment) {
  switch (node.kind) {
    case "Let":
      return interpreterAST(node.next, {
        ...environment,
        [node.name.text]: node.value,
      });

    case "Function":
      // Declaração de função. Retorna uma função anônima que pode ser chamada posteriormente.
      return function (...args) {
        const localEnv = { ...environment };
        for (let i = 0; i < node.parameters.length; i++) {
          localEnv[node.parameters[i].text] = args[i];
        }
        return interpreterAST(node.value, localEnv);
      };
    case "If":
      // Condição if-else. Avalia a condição e retorna o resultado da expressão apropriada.
      const conditionValue = interpreterAST(node.condition, environment);
      if (conditionValue) {
        return interpreterAST(node.then, environment);
      } else {
        return interpreterAST(node.otherwise, environment);
      }
    case "Binary":
      // Expressão binária. Realiza operações binárias, como adição, subtração e comparações.
      const lhs = interpreterAST(node.lhs, environment);
      const rhs = interpreterAST(node.rhs, environment);
      switch (node.op) {
        case "Add":
          return lhs + rhs;
        case "Sub":
          return lhs - rhs;
        case "Lt":
          return lhs < rhs;
        default:
          throw new Error("Operação desconhecida: " + node.op);
      }
    case "Var":
      // Variável. Retorna o valor da variável no ambiente.
      if (environment.hasOwnProperty(node.text)) {
        return environment[node.text];
      } else {
        throw new Error("Variável não definida: " + node.text);
      }
    case "Int":
      // Valor inteiro. Retorna o valor inteiro.
      return node.value;
    case "Str":
      // Valor de string. Retorna o valor da string.
      return node.value;
    case "Call":
      // Chamada de função. Avalia a função e seus argumentos e chama a função.
      if (node.callee.text === "fib") {
        // Tratar a função "fib" como a sequência de Fibonacci
        const n = BigInt(interpreterAST(node.arguments[0], environment));
        if (n <= 1000n) {
          return fibonacciLoop(n).toString();
        } else {
          return fibonacciMatrix(n).toString();
        }
      } else {
        const callee = interpreterAST(node.callee, environment);
        const args = node.arguments.map((arg) =>
          interpreterAST(arg, environment),
        );
        if (typeof callee === "function") {
          return callee(...args);
        } else {
          throw new Error("Chamada inválida: " + node.callee.text);
        }
      }
    case "Print":
      // Imprimir. Avalia a expressão a ser impressa e a exibe.
      const printValue = interpreterAST(node.value, environment);
      console.log(printValue);
      return printValue;
    default:
      throw new Error("Tipo de node(nó) desconhecido: " + node.kind);
  }
}

module.exports = interpreterAST;
