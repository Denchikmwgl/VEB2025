function getSortedArray(array, key) {
    if (!Array.isArray(array) || array.length === 0) return array;

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (String(array[j][key]) > String(array[j + 1][key])) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }

    return array;
}

const data = [
    { name: 'Иван', age: 30 },
    { name: 'Анна', age: 25 },
    { name: 'Петр', age: 35 }
];

console.log(getSortedArray(data, 'name'));
console.log(getSortedArray(data, 'age'));