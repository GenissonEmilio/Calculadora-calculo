export function evaluateExpression(expr: string): number {
  // Substitui símbolos e funções por equivalentes JavaScript
  const parsed = expr
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/√/g, 'Math.sqrt')
    .replace(/π/g, 'Math.PI')
    .replace(/\^/g, '**')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/²/g, '**2')
    .replace(/x³/g, '**3');

  try {
    // Avalia a expressão com segurança
    return Function('"use strict"; return (' + parsed + ')')();
  } catch (e) {
    throw new Error('Expressão inválida');
  }
}