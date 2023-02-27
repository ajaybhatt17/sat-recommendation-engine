/* eslint-disable prettier/prettier */
type Zeta = {
  difficultyLvl: number; //response item's difficulty (value b/w -4 to 4)
  discriminationPower: number; //response item's discrimination power (0.8 ≤ 𝑎 ≤ 2.5)
  guessAbility: number; //response item's guess ability (0 ≤ 𝑐 ≤ 1)
};

export const normal = (mean = 0, stdDev = 1, min = -4, max = 4, stepSize = 0.1) => {
  const distribution = [];
  for (let i = min; i <= max; i += stepSize) {
    distribution.push([i, y(i)]);
  }
  return distribution;

  function y(x: number) {
    return (1 / (Math.sqrt(2 * Math.PI) * stdDev)) * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
  }
};

/**
 * Calculates the probability that someone with a given ability level theta
 * will answer correctly an item. Uses the 3 parameters logistic model.
 */
export function itemResponseFunction(zeta: Zeta, theta: number) {
  const { discriminationPower: a, difficultyLvl: b, guessAbility: c } = zeta;
  return c + (((1 - c)* (Math.exp(a * (theta - b)))) / (1 + Math.exp(a * (theta - b))));
}

/**
 * Calculates how much information an item (or an array of items) contributes
 * for a given ability level theta.
 */
export function information(zeta: Zeta | Array<Zeta>, theta: number) {
  const zetaArr: Array<Zeta> = Array.isArray(zeta) ? zeta : [zeta];
  return zetaArr.reduce((acc, zeta) => {
    const { discriminationPower: a, difficultyLvl: b, guessAbility: c } = zeta;
    const probHit = 1 / (1 + Math.exp(-a * (theta - b)));
    return (
      acc +
      ((Math.pow(a, 2) * (1 - c) * (1 - probHit)) / (c + (1 - c) * probHit)) *
        Math.pow(probHit, 2)
    );
  }, 0);
}

function likelihood(answers: Array<0 | 1>, theta: number, zetas: Array<Zeta>) {
  return zetas.reduce((acc, zeta, i) => {
    const irf = itemResponseFunction(zeta, theta);
    // const p = answers[i] === 1 ? acc + Math.log(irf) : acc + Math.log(1 - irf);
    const p1 = answers[i] === 1 ? acc * irf : acc * (1 - irf);
    // console.log(answers[i], acc, zeta, irf, p, p1);
    return p1;
  }, 1);
}

/**
 * Estimate ability using the EAP method.
 * Reference: "Marginal Maximum Likelihood estimation of item parameters: application of
 * an EM algorithm" Bock & Aitkin 1981 --- equation 14.
 */
export function estimateAbilityEAP(answers: Array<0 | 1>, zeta: Array<Zeta>, previousValue = 0) {
  const abilityPrior = normal(0 , 1, -4, 4);
  let num = 0;
  let nf = 0;
  for (let i = 0; i < abilityPrior.length; i++) {
    const theta = previousValue + (abilityPrior[i][0]);
    const probability = abilityPrior[i][1];
    const like = likelihood(answers, theta, zeta);
    num += theta * like * probability;
    nf += like * probability;
  }
  return num / nf;
}

export function getProficiencyLevel(answers: Array<0 | 1>, zeta: Array<Zeta>, previousValue = 0) {
  previousValue = previousValue>0 ? ((previousValue / 100) * 8 ) - 4 : 0;
  const value = estimateAbilityEAP(answers, zeta, previousValue);
  return ((value+4)/8)*100;
}

export const fisherInformation = (theta: number, zeta: Zeta) => {
  const p = itemResponseFunction(zeta, theta);
  const q = 1 - p;
  const { discriminationPower: a, guessAbility: c } = zeta;
  return (Math.pow(a, 2) * (q / p) * (Math.pow(p - c, 2) / Math.pow(1 - c, 2)));
};

export function calculateSE(currTheta: number, zetas: Array<Zeta>, pV = 0) {
  let sum = zetas.reduce(
    (previousValue, zeta) => previousValue + fisherInformation(currTheta, zeta),
    0,
  );
  sum = sum + (pV>0 ? (1/Math.pow(pV, 2)) : 0);
  return 1 / Math.sqrt(sum);
}

export function calculateSEFromProficiency(proficiency: number, zetas: Array<Zeta>, previousValue = 0) {
  const currTheta = ((proficiency / 100) * 8 ) - 4;
  return calculateSE(currTheta, zetas, previousValue);
}

export function getConfidenceLevel(proficiency: number, zetas: Array<Zeta>, previousValue = 0) {
  const currTheta = ((proficiency / 100) * 8 ) - 4;
  const p = calculateSE(currTheta, zetas, previousValue);
  return Math.min((p/1.96)*95, 100);
}
