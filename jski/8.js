const ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

function cesar(str, shift, action) {
    shift = shift % ALPHABET.length;
    if (action === 'decode') shift = -shift;

    return str.split('').map(char => {
        const index = ALPHABET.indexOf(char.toLowerCase());
        if (index === -1) return char;

        let shiftedIndex = (index + shift + ALPHABET.length) % ALPHABET.length;
        let resultChar = ALPHABET[shiftedIndex];

        return char === char.toUpperCase() ? resultChar.toUpperCase() : resultChar;
    }).join('');
}

const decodedMessage = cesar('эзтыхз фзъзъз', 7, 'decode');
console.log(decodedMessage);