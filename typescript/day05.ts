import { inspect } from 'util'
import { loadInput } from './index'

type Operation = `move ${number} from ${number} to ${number}`

export const generateRange = (size: number): number[] => Array.from({
    length: size + 1
}, (_, i) => i)

function* chunks<T>(input: T[], n: number) {
    for (let i = 0; i < input.length; i += n) {
        yield input.slice(i, i + n);
    }
}

const extractOperation = (line: Operation) => {
    const [_move, amount, _from, from, _to, to] = line.split(' ')

    return [amount, from, to]
}


const process = async (partTwo: boolean) => {
    const data = await loadInput('05')
    const lines = data.toString().split(/[\n]/)

    const state: Map<number, string[]> = new Map()

    let lineIndex = 1

    // Find the numeric indexes for each column
    for (const [rowIdx, line] of lines.entries()) {
        const chars = [...line]
        const segment = [...chunks(chars, 4)]

        // Break when we hit the numeric allocation line
        if (chars.filter((c => c.trim().length > 0)).every((c) => parseInt(c, 10) > -1)) {
            // This is the line to start evaluating the instructions
            lineIndex = rowIdx + 1
            break
        }

        for (const [columnIdx, s] of segment.entries()) {
            // Ignore blank segments
            if (s.every((c) => c.trim().length === 0)) {
                continue
            }

            if (!state.get(columnIdx + 1)) {
                state.set(columnIdx + 1, [])
            }

            const set = state.get(columnIdx + 1) as string[]

            set.push(s.slice(1, 2).join(''))

            state.set(columnIdx + 1, set)
        }
    }

    // Begin processing from the index of the end of the state processing
    for (const line of data.toString().split(/[\n]/).slice(lineIndex + 1)) {
        let [amount, origin, destination] = extractOperation(line as Operation).map(
            (d) => parseInt(d, 10)
        )

        console.log(state)
        console.log(`moving ${amount} crates from ${origin} to ${destination}`)

        if (!partTwo) {
            while (amount > 0) {
                state.get(destination)?.unshift(state.get(origin)!.shift()!)

                amount--
            }
        } else {
            state.get(destination)!.unshift(...state.get(origin)!.slice(0, amount)!)
            state.get(origin)!.splice(0, amount)
        }
    }

    if (partTwo) {
        for (let [index, value] of state.entries()) {
            console.log('value', index, value.shift())
        }
    }


    // return state
    // return topItems
    return []
}

// process(false).then((result) => console.log(`Part one: ${inspect(result)}`))
process(true).then((result) => console.log(`Part two: ${inspect(result)}`))