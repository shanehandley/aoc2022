import { inspect } from 'util'
import { loadInput } from './index'

// const range = (start: string, end: string): number[] => Array.from({
//     length: parseInt(end, 10) - parseInt(start, 10) + 1
// }, (_, i) => i)

export const generateRange = (size: number): number[] => Array.from({
    length: size + 1
}, (_, i) => i)

export const range = (start: string, end: string) =>
    generateRange(parseInt(end, 10))
    .map((i) => i >= parseInt(start, 10) && i <= parseInt(end, 10) ? i : -1)
    .filter((i) => i >= 0)

const partOne = async () => {
    const data = await loadInput('04')
    const result = []

    for (const line of data.toString().split(/[\n]/)) {
        const [left, right] = line.split(',')

        let [leftMin, leftMax] = left.split('-')
        let [rightMin, rightMax] = right.split('-')

        result.push({
            leftIncludesRight: range(rightMin, rightMax).every((v => range(leftMin, leftMax).includes(v))),
            rightIncludesLeft: range(leftMin, leftMax).every((v => range(rightMin, rightMax).includes(v)))
        })
    }

    return result.filter((r) => r.leftIncludesRight || r.rightIncludesLeft).length
}

const partTwo = async () => {
    const data = await loadInput('04')
    const result = []

    for (const line of data.toString().split(/[\n]/)) {
        const [left, right] = line.split(',')

        let [leftMin, leftMax] = left.split('-')
        let [rightMin, rightMax] = right.split('-')

        result.push({
            overlaps: range(rightMin, rightMax).some((v => range(leftMin, leftMax).includes(v))),
        })
    }

    return result.filter((r) => r.overlaps).length
}

partOne().then((result) => console.log(`Part one: ${inspect(result)}`))
partTwo().then((result) => console.log(`Part two: ${inspect(result)}`))