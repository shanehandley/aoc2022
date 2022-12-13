import { loadInput } from './index'

// Part 1

type Prompt = 'A' | 'B' | 'C'
type Response = 'X' | 'Y' | 'Z'

const points: { [K in Response]: number } = {
    X: 1,
    Y: 2,
    Z: 3
}

const isWin = (prompt: Prompt, response: Response) =>
    (prompt === 'A' && response === 'Y') || (prompt === 'B' && response === 'Z') || (prompt === 'C' && response === 'X')

const isDraw = (prompt: Prompt, response: Response) =>
    (prompt === 'A' && response === 'X') || (prompt === 'B' && response === 'Y') || (prompt === 'C' && response === 'Z')

export const partOne = async () => {
    const data = await loadInput('02')
    let totalScore = 0;

    for (const line of data.toString().split(/[\n]/)) {
        const [prompt, response] = line.split(' ') as [Prompt, Response]
        let score = 0;

        if (isWin(prompt, response)) {
            score += 6
        }

        if (isDraw(prompt, response)) {
            score += 3
        }

        totalScore += score + points[response]
    }

    return totalScore
}

partOne().then((result) => console.log(`Part one: ${result}`))

// Part two

// X: loss
// y: draw
// z: win
type Outcome = Response


// Given a prompt and an outcome, figure out the correct response, returning its score
export const getResponse = (prompt: Prompt, outcome: Outcome): number => {
    let result = 0
    
    switch (outcome) {
        case 'X': {
            if (prompt === 'A') {
                result = points['Z']
            }

            if (prompt === 'B') {
                result = points['X']
            }
            if (prompt === 'C') {
                result = points['Y']
            }
            break
        }
        case 'Y': {
            result += 3

            if (prompt === 'A') {
                result += points['X']
            }

            if (prompt === 'B') {
                result += points['Y']
            }
            if (prompt === 'C') {
                result += points['Z']
            }
            break
        }
        case 'Z': {
            result += 6

            if (prompt === 'A') {
                result += points['Y']
            }
    
            if (prompt === 'B') {
                result += points['Z']
            }
            if (prompt === 'C') {
                result += points['X']
            }
            break
        }
    }

    return result
}

export const partTwo = async () => {
    const data = await loadInput('02')
    let totalScore = 0;

    for (const line of data.toString().split(/[\n]/)) {
        const [prompt, outcome] = line.split(' ') as [Prompt, Outcome]

        totalScore += getResponse(prompt, outcome)
    }

    return totalScore
}

partTwo().then((result) => console.log(`Part two: ${result}`))