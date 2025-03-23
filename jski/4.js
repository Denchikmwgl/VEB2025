function pluralizeRecords(n) {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    let word = 'записей';

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        word = 'запись';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
        word = 'записи';
    }

    return `В результате выполнения запроса было найдено ${n} ${word}`;
}

console.log(pluralizeRecords(1));
console.log(pluralizeRecords(2));
console.log(pluralizeRecords(5));
console.log(pluralizeRecords(21));