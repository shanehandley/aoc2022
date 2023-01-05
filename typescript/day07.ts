import { inspect as _inspect } from 'util'
import { loadInput } from './index'

const TOTAL_DISK_SPACE = 70000000
const REQUIRED_DISK_SPACE = 30000000

const inspect = (data: any) => _inspect(data, false, 10, false)

interface File {
    name: string
    type: 'directory' | 'file',
    size: number
}

interface LSResult {
    path: string
    totalSize: number
    files?: File[]
}

let fileSystem: LSResult[] = []

export let currentPath: string[] = []

export const changePath = (path: '..' | string): void => {
    if (path === '/') {
        currentPath = []
    } else if (path === '..') {
        currentPath.pop()
    } else {
        currentPath.push(path)
    }
}

export const processPath = (lines: string[], idx: number): LSResult => {
    let _result: LSResult = {
        path: `/${currentPath.join('/')}`,
        files: [],
        totalSize: 0
    }

    // check if we are running an ls. If not, it's probably another $ cd into another dir, which we can ignore
    if (lines[idx + 1].startsWith('$ ls')) {
        // Take all lines until we hit the next command statement
        const entries = lines.slice(idx + 2)

        for (const entry of entries.values()) {
            if (isCommand(entry)) {
                break
            }

            if (entry.startsWith('dir')) {
                const [_dir, name] = entry.split(' ')

                _result.files!.push({
                    name: entry.split('dir ')[1],
                    type: 'directory',
                    size: 0
                })
            } else {
                const [size, name] = entry.split(' ')

                _result.files!.push({
                    name: name!,
                    type: 'file',
                    size: parseInt(size, 10),
                })
            }
        }
    }

    return _result
}

const isCommand = (input: string): boolean => input.startsWith('$')

const process = async () => {
    const data = await loadInput('07')
    const lines = data.toString().split(/[\n]/)

    // Process the input
    for (const [idx, line] of lines.entries()) {
        if (isCommand(line)) {
            if (line.startsWith('$ cd')) {
                changePath(line.split('$ cd ')[1])

                // if the next line is an ls, process it
                if (lines[idx + 1].startsWith('$ ls')) {
                    fileSystem.push(processPath(lines, idx))
                }
            }
        }
    }

    // Clean and sort, removing empty directories which do not affect size computations
    // fileSystem = fileSystem.filter(({ files }) => files && files.length).sort((a, b) => a.path.length - b.path.length).reverse()
    fileSystem = fileSystem.sort((a, b) => a.path.length - b.path.length).reverse()

    // We now have sizes computed for all files, but not directories. we can use this as a base to compute others
    const knowns: LSResult[] = fileSystem
        .filter(({ files }) => files?.every((f) => f.size > 0))
        .map((item) => ({
            ...item,
            totalSize: item.files!.reduce((p, c) => p += c.size, 0)
        }))

    let unknowns: LSResult[] = fileSystem
        .filter(({ files }) => !files?.every((f) => f.size > 0))

    // If we iterate over all of our known items, we can backfill unknown items that contain a reference to that directory
    const processUnknowns = () => {
        knowns.forEach(({ path, totalSize }) => {
            const matchPath = path === '/' ? path : path.split('/').slice(0, -1).join('/')
            const directoryName = path === '/' ? path : path.split('/').pop()

            const matchingResult = unknowns.find(({ path }) => path === matchPath)

            if (matchingResult) {
                // Update the `file` record for this item
                const updateItem: LSResult = {
                    ...matchingResult,
                    files: matchingResult.files?.map((f) => f.name === directoryName ? { ...f, size: totalSize } : f)
                }

                const index = unknowns.findIndex(({ path }) => path === matchPath)

                // If at this point we know the size of all files within this path, we can push it into the 'knowns' and remove it from the unknowns
                if (updateItem.files?.every((f) => f.size > 0)) {
                    knowns.push({
                        ...updateItem,
                        totalSize: updateItem.files!.reduce((p, c) => p += c.size, 0)
                    })

                    unknowns = unknowns.filter(({ path }) => path !== matchPath)
                } else {
                    // Overwrite the 'unknown' instance
                    unknowns[index] = updateItem
                }
            }
        })
    }

    // Iterate until there is 1 unknown left (the root path: '/')
    while (unknowns.length > 1) {
        processUnknowns()
    }

    // Since 'knowns' cannot really know about the root path, finally compute it here
    const rootObject = unknowns[0]

    const updatedFiles = rootObject.files?.map((f) => {
        if (f.type !== 'directory') {
            return f
        }

        return {
            ...f,
            size: knowns.find((k) => k.path === `/${f.name}`)?.totalSize!
        }
    })

    knowns.push({
        ...rootObject,
        files: updatedFiles,
        totalSize: updatedFiles!.reduce((previous, current) => previous += current.size, 0)
    })

    return knowns
}

// Part 1
// process().then((result) => {
//     const lessThanOnek = result.filter((item) => item.totalSize <= 100000)
//     const _result = lessThanOnek.reduce((p, c) => p + c.totalSize, 0)

//     console.log(`Part one: ${inspect(_result)}`)
// })

// Part 2
process().then((result) => {
    const usedSpace = result.find(({ path }) => path === '/')?.totalSize!
    const requiredDiskSpaceToBeDeleted = -(TOTAL_DISK_SPACE - REQUIRED_DISK_SPACE - usedSpace)

    const candidate = result.filter(({ totalSize }) => totalSize >= requiredDiskSpaceToBeDeleted).sort((a, b) => a.totalSize - b.totalSize)[0]

    console.log(`Part two: ${inspect(candidate.totalSize)}`)
})
