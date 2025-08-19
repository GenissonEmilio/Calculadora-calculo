// Função auxiliar: fatorial
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// Série de Taylor para exponencial
function taylorExp(x: number, terms = 20): number {
  let result = 0;
  for (let n = 0; n < terms; n++) {
    result += Math.pow(x, n) / factorial(n);
  }
  return result;
}

// Série de Taylor para seno
function taylorSin(x: number, terms = 20): number {
  let result = 0;
  for (let n = 0; n < terms; n++) {
    result += Math.pow(-1, n) * Math.pow(x, 2 * n + 1) / factorial(2 * n + 1);
  }
  return result;
}

// Série de Taylor para cosseno
function taylorCos(x: number, terms = 20): number {
  let result = 0;
  for (let n = 0; n < terms; n++) {
    result += Math.pow(-1, n) * Math.pow(x, 2 * n) / factorial(2 * n);
  }
  return result;
}

// Série de Taylor para logaritmo natural (ln)
function taylorLog(x: number, terms = 50): number {
  if (x <= 0) throw new Error("Log indefinido para x <= 0");
  const y = (x - 1) / (x + 1);
  let result = 0;
  for (let n = 0; n < terms; n++) {
    result += (1 / (2 * n + 1)) * Math.pow(y, 2 * n + 1);
  }
  return 2 * result;
}

// Avaliador de expressão usando nossas séries
export function evaluateExpression(expr: string): number {
  const parsed = expr
    .replace(/sin\((.*?)\)/g, (_, g1) => `taylorSin(${g1})`)
    .replace(/cos\((.*?)\)/g, (_, g1) => `taylorCos(${g1})`)
    .replace(/log\((.*?)\)/g, (_, g1) => `taylorLog(${g1})`)
    .replace(/eˣ\((.*?)\)/g, (_, g1) => `taylorExp(${g1})`) // se você usar eˣ(x)
    .replace(/√/g, 'Math.sqrt')
    .replace(/π/g, 'Math.PI')
    .replace(/\^/g, '**')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '**2')
    .replace(/x³/g, '**3');

  try {
    return Function(
      `"use strict"; 
      return ((${taylorSin.toString()})
              (${taylorCos.toString()})
              (${taylorLog.toString()})
              (${taylorExp.toString()})
              ${parsed})`
    )();
  } catch (e) {
    throw new Error("Expressão inválida");
  }
}
