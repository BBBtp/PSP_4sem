function flatten(arr) {
    let result = [];

    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item));
        } else {
            result.push(item);
        }
    });

    return result;
}

// Пример использования:
const nestedArray = [1, 2, 3, [4, 5, 6, [10, 20, 30]]];
const flatArray = flatten(nestedArray);
console.log(flatArray); // [1, 2, 3, 4, 5, 6, 10, 20, 30]
const input = [1, 2, 3, 4, 5]
let result = []

for (let el of input.reverse()) {
    const len = result.length
    if (len > 0) {
        result.push([el, result[len-1]])
    } else {
        result.push([el])
    }
}

console.log(result)