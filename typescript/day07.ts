import { inspect } from 'util'
import { loadInput } from './index'

interface LSResult {
    path: string
    files?: {
        name: string
        type: 'directory' | 'file',
        size: number
    }[]
}

interface PathResult {
    path: string
    contents?: any
    size: number
}

const isCommand = (input: string): boolean => input.startsWith('$')

const process = async () => {
    const data = await loadInput('07')
    const lines = data.toString().split(/[\n]/)

    const result: PathResult[] = []

    let currentPath: string[] = []

    const changePath = (path: '..' | string): void => {
        if (path === '/') {
            currentPath = []
        } else if (path === '..') {
            currentPath.pop()
        } else {
            currentPath.push(path)
        }
    }

    const computePathSize = (idx: number): PathResult => {
        let size = 0
        let contents = {}

        if (currentPath.length === 0) {
            // Just inspect the root path
            size += lines
                .filter(l => !isNaN(parseInt(l[0], 10)))
                .map((l) => {
                    return parseInt(l.split(' ')[0])
                })
                .reduce((previous, current) => previous += current)
        } else {
            // Find where we cd'd into the path

        }

        return {
            path: `/${currentPath.join('/')}`,
            size
        }
    }

    for (const [idx, line] of lines.entries()) {
        console.log(`Current Path: /${currentPath.join('/')}`)

        if (isCommand(line)) {
            if (line.startsWith('$ cd')) {
                changePath(line.split('$ cd ')[1])

                // check if we are running an ls
                if (lines[idx + 1].startsWith('$ ls')) {
                    let result: LSResult = {
                        path: `/${currentPath.join('/')}`,
                        files: []
                    }

                    // Take all lines until we hit the next command statement
                    const entries = lines.slice(idx + 2)

                    for (const entry of entries.values()) {
                        if (isCommand(entry)) {
                            break
                        }

                        if (entry.startsWith('dir')) {
                            result.files?.push({
                                name: entry.split('dir ')[1],
                                type: 'directory',
                                size: 0
                            })
                        } else {
                            const [size, name] = entry.split(' ')

                            result.files?.push({
                                name: name!,
                                type: 'file',
                                size: parseInt(size, 10),
                            })
                        }
                    }

                    console.log('contents', result)
                }

                break
            }
        }
    }

    console.log(result)

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result), false, 5}`))