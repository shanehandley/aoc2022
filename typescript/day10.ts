import { inspect } from 'util'
import { loadInput } from './index'

type Instruction = 'noop' | 'addx'

const process = async () => {
    const data = await loadInput('10')
    const lines = data.toString().split(/[\n]/)

    const schedule: Map<number, {
        instruction: Instruction
        description: string,
        call: () => number,
        x: number
    }> = new Map()

    let x = 1
    let cycle = 1

    const values: number[] = []

    // const breakpoints = [20, 60, 100, 180, 220]

    const result: { cycle: number, value: number }[] = []

    for (const [_, line] of lines.entries()) {
        const [instruction, args] = line.split(' ') as [Instruction, string | undefined]

        if (instruction === 'addx') {
            if (!schedule.get(cycle)) {
                schedule.set(cycle, {
                    instruction: 'noop',
                    description: 'Processing addx',
                    call: () => x,
                    x,
                })
            }

            if (!schedule.get(cycle + 1)) {
                schedule.set(cycle + 1, {
                    instruction: 'noop',
                    description: `Beginning execution of addx`,
                    call: () => x,
                    x,
                })
            }

            schedule.set(cycle + 2, {
                instruction: 'addx',
                description: `Completed execution of addx ${args}`,
                call: () => x += parseInt(args as string, 10),
                x: x + parseInt(args as string, 10),
            })

            values.push(x, x += parseInt(args as string, 10))
        } else {
            // If there is nothing scheduled here, make it a noop
            const { description, call } = schedule.get(cycle) || { description: 'noop', call: () => x }

            if (!description || !description.includes('addx')) {
                schedule.set(cycle, {
                    instruction: 'noop',
                    description: 'noop',
                    call: () => x,
                    x
                })
            }

            values.push(x)
        }

        cycle++
    }

    // execute the last two cycles
    // [schedule.get(lines.length), schedule.get(lines.length + 1)].map((s) => s && s())

    // console.log('schedule', schedule)

    [20, 60, 100, 140, 180, 220].map((breakpoint, index) => {
        console.log(`${index} ${breakpoint}: ${values[breakpoint -1]}`)
        console.log(`${values[breakpoint -1] * breakpoint}`)
    })

    console.log(values.length)

    // console.log(`20: ${values[19]}`)
    // console.log(`60: ${values[59]}`)
    // console.log(`100: ${values[99]}`)
    // for (const [cycle, details] of schedule) {
    //     const { description, call } = details

    //     call()

    //     console.log('X is', x)
    // }

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))