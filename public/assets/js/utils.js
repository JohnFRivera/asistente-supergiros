/**
 * Generar número aleatorio entre 1 y un número especifico como limite.
 * @param {number} limit Limite.
 * @returns Numero aleatorio.
 */
export const generateRandom = (limit = 1) => (Math.floor(Math.random() * limit) + 1);

/**
 * Eliminar las tildes de un texto.
 * @param {string} text Texto.
 * @returns Texto sin tildes.
 */
export const removeAccent = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/**
 * Valida si un texto cantiene alguna palabra en referencia a un número.
 * @param {string} transcript Transcripción.
 * @returns Si tiene un número devuelve el número, sino devuelve falso.
 */
export const hasNumber = (transcript) => {
    const numbers = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    let number = false;
    numbers.forEach((n, i) => {
        transcript.toLowerCase().includes(n) && (number = i);
    });
    return number;
};