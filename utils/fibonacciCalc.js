// Função para calcular a sequência de Fibonacci usando um loop
function fibonacciLoop(n) {
  let a = BigInt(0),
    b = BigInt(1);
  for (let i = BigInt(0); i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}

// Função para calcular a sequência de Fibonacci usando matrizes (exponenciação rápida)
function fibonacciMatrix(n) {
  const base = [
    [1n, 1n],
    [1n, 0n],
  ];
  const result = fastMatrixPower(base, n - 1n); // n - 1 porque a matriz começa com F(0) e F(1)
  return result[0][0];
}

// exponenciação rápida de matriz
function fastMatrixPower(matrix, exp) {
  if (exp === 1n) {
    return matrix;
  }
  if (exp % 2n === 0n) {
    const half = fastMatrixPower(matrix, exp / 2n);
    return multiplyMatrix(half, half);
  } else {
    const half = fastMatrixPower(matrix, (exp - 1n) / 2n);
    const result = multiplyMatrix(half, half);
    return multiplyMatrix(result, matrix);
  }
}

function multiplyMatrix(matrixA, matrixB) {
  const result = [];
  for (let i = 0; i < matrixA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0n;
      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

module.exports = { fibonacciLoop, fibonacciMatrix };
