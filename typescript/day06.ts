import { inspect } from 'util'
import { loadInput } from './index'

const unique = (input: string[]): boolean => new Set(input).size === input.length

const process = async (num: number) => {
    const data = await loadInput('06')
    const lines = data.toString().split(/[\n]/)

    let index = 0
    const result = ''

    // Find the numeric indexes for each column
    for (const [_, line] of lines.entries()) {
        const chars = [...line]

        while (index < chars.length) {
            if (unique(chars.slice(index, index + num))) {
                console.log(line.indexOf(chars.slice(index, index + 4).join('')) + num)

                break
            }

            index++
        }
    }

    return result
}

process(4).then((result) => console.log(`Part one: ${inspect(result)}`))
process(14).then((result) => console.log(`Part two: ${inspect(result)}`))