function minDigit(x) {
    let min = 9;
    while (x > 0) {
        const digit = x % 10;
        if (digit < min) {
            min = digit;
        }
        x = Math.floor(x / 10);
    }
    return min;
}

console.log(minDigit(5387));