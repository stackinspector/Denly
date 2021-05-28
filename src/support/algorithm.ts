/** Quicksort Demo */
export function sort(arr: number[]): number[] {
    // length < 1 don't need sort
    if (arr.length < 1) return arr;

    // find middle index
    const mid = Math.floor(arr.length / 2);

    // get middle value
    const temp = arr.splice(mid, 1)[0];

    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < temp) {
            left.push(arr[i]);
        } else if (arr[i] >= temp) {
            right.push(arr[i]);
        }
    }

    // recursive and return the result
    return sort(left).concat(temp, sort(right));
}
