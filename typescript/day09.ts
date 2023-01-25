import { inspect } from 'util'
import { loadInput } from './index'

type Direction = 'R' | 'U' | 'L' | 'D'

const process = async () => {
    const data = await loadInput('09')
    const lines = data.toString().split(/[\n]/)

    const row = '.'.repeat(6).split('')

    let grid = [
        row,
        row,
        row,
        row,
        row,
        row,
        ['#', ...'.'.repeat(5).split('')]
    ]

    const result: string[] = []

    let yIdx = grid.length - 1
    let xIdx = 0

    let headPosition: [number, number] = [0, 0]
    let tailPosition: [number, number] = [0, 0]

    const clearHead = () => grid = grid.map(row => row.map((cell) => cell === 'H' ? '.' : cell))

    const setHeadPosition = (yIdx: number, xIdx: number) => {
        headPosition = [yIdx, xIdx]

        clearHead()

        grid[yIdx][xIdx] = 'H'
    }

    const clearTail = () => grid = grid.map(row => row.map((cell) => cell === 'T' ? '#' : cell))

    // If the tail is already adjacent to the head, there's no movement
    const setTailPosition = (yIdx: number, xIdx: number, direction: Direction) => {
        const [yTail, xTail] = tailPosition

        // If the current head position is within 1 of us, we don't need to move
        // if (Math.abs(yHead - yTail) <= 1) {
        //     console.log('SKIPPING TAIL MOVEMENT', yHead, xHead)

        //     return
        // }

        switch (direction) {
            case 'R': {
                for (let index = xIdx; index != 0; index--) {
                    if (grid[yIdx][index] !== 'H') {
                        grid[yIdx][index] = '#'
                    }
                }


                break
            }
            case 'U':
                for (let index = yIdx; index != 0; index--) {
                    if (grid[index][xIdx] !== 'H') {
                        grid[index][xIdx] = '#'
                    }
                }

                break
            case 'L':
            case 'D': {
                clearTail()
                grid[yIdx][xIdx] = 'T'
            }
        }

        grid[yIdx][xIdx] = 'T'
        tailPosition = [yIdx, xIdx]
    }

    for (const [idx, line] of lines.entries()) {
        const [direction, _amount] = line.split(' ') as [Direction, string]
        const amount = parseInt(_amount, 10)

        switch (direction) {
            case 'R': {
                xIdx = + amount

                setHeadPosition(yIdx, xIdx)

                if (amount > 1) {
                    setTailPosition(yIdx, xIdx - 1, direction)
                }

                break
            }
            case 'U': {
                // Check that we have the vertical space in our grid
                for (let index = 1; index <= amount; index++) {
                    if (grid[yIdx - index] === undefined) {
                        grid[yIdx - index] = row
                    }
                }

                yIdx -= amount

                setHeadPosition(yIdx, xIdx)

                if (amount > 1) {
                    setTailPosition(yIdx + 1, xIdx, direction)
                }

                break
            }
            case 'L': {
                xIdx -= amount

                setHeadPosition(yIdx, xIdx)

                if (amount > 1) {
                    setTailPosition(yIdx, xIdx + 1, direction)
                }

                break
            }
            case 'D': {
                yIdx -= amount

                setHeadPosition(yIdx, xIdx)

                if (amount > 1) {
                    setTailPosition(yIdx + 1, xIdx, direction)
                }

                break
            }
            default: {
                throw new Error(`unhandled direction: ${direction}`)
            }
        }

        console.log(direction, amount)
        console.table(grid)

        // break
    }

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))