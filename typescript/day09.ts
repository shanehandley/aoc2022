import { inspect } from 'util'
import { loadInput } from './index'

const process = async () => {
    const data = await loadInput('09')
    const lines = data.toString().split(/[\n]/)

    const grid = [['s']]
    const result: string[] = []

    let yIdx = 0
    let xIdx = 0

    let hPos = new Map<number, number[]>()
    let tPos = new Map<number, number[]>()

    hPos.set(0, [])

    for (const [idx, line] of lines.entries()) {
        const [direction, _amount] = line.split(' ')
        const amount = parseInt(_amount, 10)

        switch (direction) {
            case 'R': {
                xIdx =+ amount

                hPos.set(0, [yIdx, xIdx])
                break
            }
            case 'U': {
                yIdx += amount

                hPos.set(0, [yIdx, xIdx])
                break
            }
            case 'L': {
                xIdx -= amount
                break
            }
            case 'D': {
                yIdx -= amount
                break
            }
            default: {
                console.log('LINE', line)
                throw new Error(`unhandled direction: ${direction}`)

            }
        }

        console.log(direction, amount)
        console.log('HPOS', hPos)

        // Move the head to that position
        // grid[yIdx][xIdx] = 'H'

        if (idx > 0) {
            switch (direction) {

            }
        }
    }

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))