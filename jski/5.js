function fibb(n) {
    if (n < 0 || n > 1000) {
        throw new Error('Число n должно быть в диапазоне от 0 до 1000');
    }

    if (n === 0) return 0;
    if (n === 1) return 1;

    let prev = 0;
    let curr = 1;

    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }

    return curr;
}

console.log(fibb(0));
console.log(fibb(1));
console.log(fibb(10));
console.log(fibb(20));