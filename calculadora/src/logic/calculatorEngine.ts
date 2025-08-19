// calculatorEngine.ts

// Função fatorial para auxiliar nas séries de Taylor
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialFunc(x: number): number {
  if (x < 0) throw new Error('Fatorial de número negativo');
  if (!Number.isInteger(x)) throw new Error('Fatorial de número não inteiro');
  
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
}

// Converter graus para radianos
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Seno usando série de Taylor (recebe graus e converte para radianos)
function taylorSin(x: number): number {
  // Converter graus para radianos
  const radians = degreesToRadians(x);
  
  // Reduzir o ângulo para o intervalo [-π, π]
  let normalized = radians % (2 * Math.PI);
  if (normalized > Math.PI) normalized -= 2 * Math.PI;
  if (normalized < -Math.PI) normalized += 2 * Math.PI;
  
  let result = 0;
  const terms = 12;
  
  for (let n = 0; n < terms; n++) {
    const term = Math.pow(-1, n) * Math.pow(normalized, 2 * n + 1) / factorial(2 * n + 1);
    result += term;
  }
  
  return result;
}

// Cosseno usando série de Taylor (recebe graus e converte para radianos)
function taylorCos(x: number): number {
  // Converter graus para radianos
  const radians = degreesToRadians(x);
  
  // Reduzir o ângulo para o intervalo [-π, π]
  let normalized = radians % (2 * Math.PI);
  if (normalized > Math.PI) normalized -= 2 * Math.PI;
  if (normalized < -Math.PI) normalized += 2 * Math.PI;
  
  let result = 0;
  const terms = 12;
  
  for (let n = 0; n < terms; n++) {
    const term = Math.pow(-1, n) * Math.pow(normalized, 2 * n) / factorial(2 * n);
    result += term;
  }
  
  return result;
}

// Logaritmo na base 10 usando série de Taylor
function taylorLog10(x: number): number {
  if (x <= 0) throw new Error('Logaritmo de número não positivo');
  
  let count = 0;
  let tempX = x;
  
  // Ajustar o valor para o intervalo [1, 10) usando propriedades dos logaritmos
  while (tempX >= 10) {
    tempX /= 10;
    count++;
  }
  
  while (tempX < 1) {
    tempX *= 10;
    count--;
  }
  
  // Agora tempX está no intervalo [1, 10)
  // Para a série de Taylor, precisamos de um valor no intervalo (0, 2]
  // Se tempX > 2, usamos: log₁₀(x) = log₁₀(x/10) + 1
  if (tempX > 2) {
    tempX /= 10;
    count++;
  }
  
  // Série de Taylor para log₁₀(1 + z) onde z = tempX - 1
  const z = tempX - 1;
  let result = 0;
  const terms = 30; // Aumentei para melhor precisão
  const ln10 = 2.302585092994046; // ln(10)
  
  for (let n = 1; n <= terms; n++) {
    const term = Math.pow(-1, n + 1) * Math.pow(z, n) / (n * ln10);
    result += term;
  }
  
  // Adicionar o contador (propriedade: log₁₀(10ⁿ * x) = n + log₁₀(x))
  return count + result;
}

// Exponencial usando série de Taylor
// Exponencial usando série de Taylor com melhor precisão para valores grandes
function taylorExp(x: number): number {
  // Para valores grandes, usamos a propriedade: e^x = (e^(x/2))^2
  // Isso melhora a convergência da série
  if (x > 1) {
    const halfExp = taylorExp(x / 2);
    return halfExp * halfExp;
  }
  
  // Para valores negativos, usamos: e^x = 1 / e^(-x)
  if (x < 0) {
    return 1 / taylorExp(-x);
  }
  
  // Para valores entre 0 e 1, usamos a série de Taylor diretamente
  let result = 0;
  const terms = 30; // Aumentamos o número de termos para melhor precisão
  
  for (let n = 0; n < terms; n++) {
    result += Math.pow(x, n) / factorial(n);
  }
  
  return result;
}

export function evaluateExpression(expr: string): number {
  // Primeiro, vamos processar manualmente as funções personalizadas
  const processFunctions = (expression: string): string => {
    let processed = expression;

    // Processar factorial(...)
    processed = processed.replace(/factorial\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(factorialFunc(innerValue));
      } catch (e) {
        console.error('Erro em factorial:', e);
        return match;
      }
    });
    
    // Processar sin(...)
    processed = processed.replace(/sin\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorSin(innerValue));
      } catch (e) {
        console.error('Erro em sin:', e);
        return match;
      }
    });
    
    // Processar cos(...)
    processed = processed.replace(/cos\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorCos(innerValue));
      } catch (e) {
        console.error('Erro em cos:', e);
        return match;
      }
    });
    
    // Processar log(...)
    processed = processed.replace(/log\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        const result = taylorLog10(innerValue);
        return String(result);
      } catch (e) {
        console.error('Erro em log:', e, 'inner:', inner);
        return match;
      }
    });
    
    // Processar e^(...)
    processed = processed.replace(/e\^\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorExp(innerValue));
      } catch (e) {
        console.error('Erro em e^:', e);
        return match;
      }
    });
    
    return processed;
  };

  // Função auxiliar para avaliar expressões simples
  function evaluateSimpleExpression(simpleExpr: string): number {
    const parsed = simpleExpr
      .replace(/√/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/\^/g, '**')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '**2')
      .replace(/x³/g, '**3');

    try {
      return Function('"use strict"; return (' + parsed + ')')();
    } catch (e) {
      console.error('Erro em expressão simples:', e, 'expr:', simpleExpr);
      throw new Error('Expressão interna inválida');
    }
  }

  try {
    // Primeiro processa as funções personalizadas
    const processedExpr = processFunctions(expr);
    
    // Depois avalia a expressão completa normalmente
    const finalParsed = processedExpr
      .replace(/√/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/\^/g, '**')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '**2')
      .replace(/x³/g, '**3');

    const result = Function('"use strict"; return (' + finalParsed + ')')();
    return result;
  } catch (e) {
    console.error('Erro na avaliação final:', e, 'expr:', expr);
    throw new Error('Expressão inválida');
  }
}