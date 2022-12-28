import { inspect } from 'util'
import { loadInput } from './index'

interface Mapping {
    north: number[]
    east: number[]
    south: number[]
    west: number[]
}

export const extractTrees = (lines: string[], xIdx: number, yIdx: number): Mapping => {
    const chars = lines.filter((_v, index) => index === xIdx).at(0)?.split('')!

    // Horizontals: Every char with the given x-index
    const horizontal = chars.map(t => parseInt(t, 10))

    // Verticals...
    const verticals = lines.map((value) => {
        for (const [idx, v] of [...value].entries()) {
            if (idx != yIdx) {
                continue
            }

            return parseInt(v, 10)
        }
    })

    const north = verticals.slice(0, xIdx) as number[]
    const south = verticals.slice(xIdx + 1) as number[]
    const east = horizontal.slice(0, yIdx) as number[]
    const west = horizontal.slice(yIdx + 1) as number[]

    const result = {
        north,
        east,
        south,
        west
    }

    return result
}

export const process = async () => {
    const data = await loadInput('08')
    const lines = data.toString().split(/[\n]/)

    let visibleTrees = 0

    for (const [xIdx, line] of lines.entries()) {
        // top and bottom rows are always visible
        if (xIdx === 0 || xIdx === lines.length - 1) {
            visibleTrees += line.length
            
            continue
        }
        
        const chars = [...line]
        
        // Iterate over the horizontal characters
        for (const [yIdx, char] of chars.entries()) {
            
            // the left and right trees are always visible, so we can add them for each line
            if (yIdx === 0 || yIdx === chars.length - 1) {
                // console.log(`Since this char ${char} is the first or last character in the row ${xIdx}, incrementing once`)

                visibleTrees += 1

                continue
            }

            // with our char, we need to get an array of trees N, E, S and W of it
            const { north, east, south, west } = extractTrees(lines, xIdx, yIdx)

            if (north.every(t => t < parseInt(char, 10))) {
                console.log(`${char} (${xIdx}, ${yIdx}) is visible from the north because all trees to the north are lower: ${north}`)
                visibleTrees++

                continue
            }

            if (east.every(t => t < parseInt(char, 10))) {
                console.log(`${char} (${xIdx}, ${yIdx}) is visible from the east because all trees to the east are lower: ${east}`)
                visibleTrees++

                continue
            }

            if (south.every(t => t < parseInt(char, 10))) {
                console.log(`${char} (${xIdx}, ${yIdx}) is visible from the south because all trees to the south are lower: ${south}`)
                visibleTrees++

                continue
            }

            if (west.every(t => t < parseInt(char, 10))) {
                console.log(`${char} (${xIdx}, ${yIdx}) is visible from the west because all trees to the west are lower: ${west}`)
                visibleTrees++

                continue
            }
        }
    }

    return visibleTrees
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))