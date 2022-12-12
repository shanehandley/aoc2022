import { loadInput } from './index'

const process = async () => {
    const data = await loadInput('01')

    let elves: number[] = []
    let index = 0

    for (const line of data.toString().split(/[\n]/)) {
        const value = parseInt(line)

        if (isNaN(elves[index])) {
            elves[index] = 0
        }

        if (!value || isNaN(value)) {
            index++
        } else {
            elves[index] += value
        }
    }

    return elves.sort((a, b) => b - a)
}

process().then((result) => console.log(`Part one: ${result[0]}`))
process().then((result) => console.log(`Part two: ${result.slice(0, 3).reduce((previous, current) => previous + current)}`))