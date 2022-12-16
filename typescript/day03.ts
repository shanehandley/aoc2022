import { group } from 'console';
import { loadInput } from './index'

const scores = [
    '', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const partOne = async () => {
    const data = await loadInput('03')

    let totalScore = 0;

    for (const line of data.toString().split(/[\n]/)) {
        const [compartmentOne, compartmentTwo] = [line.substring(0, line.length / 2), line.substring(line.length / 2)]

        const commonItems = new Set([...compartmentOne].filter((c) => compartmentTwo.includes(c)))

        const priority = Array.from(commonItems).length ? Array.from(commonItems).map((c) => scores.indexOf(c)).reduce((p, c) => p + c) : 0

        totalScore += priority
    }

    return totalScore
}

export const partTwo = async () => {
    const data = await loadInput('03')
    const lines = data.toString().split(/[\n]/)
    
    let totalScore = 0;
    let _groups: string[][] = []

    lines.forEach((l, index) => {
        let i = index % 3 

        if (i === 0) {
            _groups[index] = [lines[index], lines[index + 1], lines[index + 2]]
        }
    })

    const groups = _groups.filter((g) => g?.length)

    for (const group of groups) {
        const commonItems = new Set([...group[0]].filter((c) => group[1].includes(c) && group[2].includes(c)))
        
        if (commonItems?.size > 0) {
            totalScore += Array.from(commonItems).length ? Array.from(commonItems).map((c) => scores.indexOf(c)).reduce((p, c) => p + c) : 0
        }
    }

    return totalScore
}

partOne().then((result) => console.log(`Part one: ${result}`))
partTwo().then((result) => console.log(`Part two: ${result}`))