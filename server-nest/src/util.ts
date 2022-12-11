export default function groupBy<T, Q>(
    arr: T[],
    key: string,
    map: (value: T) => Q,
) {
    return arr.reduce((acc, cur) => {
        const k = cur[key];
        const v = map(cur);
        acc[k] ? acc[k].push(v) : (acc[k] = [v]);
        return acc;
    }, {} as { [key: string]: Q[] });
}
