import { inspect } from 'util'
import { loadInput } from './index'

type Instruction = 'noop' | 'addx'

const process = async () => {
    const data = await loadInput('10')
    const lines = data.toString().split(/[\n]/)

    let x = 1
    let cycle = 1

    const values: number[] = []

    const result: { cycle: number, value: number }[] = []

    for (const [_, line] of lines.entries()) {
        const [instruction, args] = line.split(' ') as [Instruction, string | undefined]

        if (instruction === 'addx') {
            values.push(x, x += parseInt(args as string, 10))
        } else {
            values.push(x)
        }

        cycle++
    }

    [20, 60, 100, 140, 180, 220].map((breakpoint, index) => {
        console.log(`${index} ${breakpoint}: ${values[breakpoint -1]}`)
    })

    values.forEach((f, i) => console.log(i, f))

    const blah = [20, 60, 100, 140, 180, 220].reduce((previous, current) => previous += values[current -1] * current, 0)

    console.log(blah)

    // console.log(`${values[220] * 220}`)

    // console.log(values.length)

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))