import { inspect } from 'util'
import { loadInput } from './index'

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

const isCommand = (input: string): boolean => input.startsWith('$')

const process = async () => {
    const data = await loadInput('07')
    const lines = data.toString().split(/[\n]/)

    const result: LSResult[] = []

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

    const processPath = (idx: number): LSResult => {
        let result: LSResult = {
            path: `/${currentPath.join('/')}`,
            files: [],
            totalSize: 0
        }

        // check if we are running an ls
        if (lines[idx + 1].startsWith('$ ls')) {
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
        }

        return result
    }

    for (const [idx, line] of lines.entries()) {
        if (isCommand(line)) {
            if (line.startsWith('$ cd')) {
                changePath(line.split('$ cd ')[1])

                // check if we are running an ls
                result.push(processPath(idx))
            }
        }
    }

    const buildDirectorySizes = (data: LSResult): LSResult => {
        if (!data.files?.length) {
            return data
        }

        return {
            ...data,
            files: data.files.map((file) => {
                if (file.size > 0) {
                    return file
                }

                const lookup = result.find((t) => t.path === data.path)

                console.log('data', data, lookup)

                return {
                    ...file,
                    size: file.size === 0 ? result.find((t) => t.path === data.path)?.totalSize || 0 : file.size
                } 
            })
        }
    }

    // // Fill in the sizes for directories
    // const withDirectories = result.map((total): LSResult => {
    //     if (!total.files?.length) {
    //         return total
    //     }

    //     if (total.files.every((f) => f.size > 0)) {
    //         return total
    //     }

    //     return {
    //         ...total,
    //         files: total.files.map((f) => {
    //             if (f.size === 0) {
    //                 const lookup = result.find((t) => t.path === total.path)

    //                 return { ...f, size: lookup!.totalSize }
    //             }

    //             return f
    //         })
    //     }
    // })

    return result.map(buildDirectorySizes).filter(r => r.files?.length || 0 > 0).map((result) => {
        return {
            ...result,
            totalSize: result.files!.reduce((value: number, entry: File) => {
                return value + entry.size
            }, 0)
        }
    })

    // const fileTotals = result.filter(r => r.files?.length || 0 > 0).map((result) => {
    //     return {
    //         ...result,
    //         totalSize: result.files?.reduce(reducerFn(result.path), 0)
    //     }
    // })

    // return fileTotals.map((total) => {
    //     if (total.files?.some((f) => f.size === 0)) {
    //         console.log('f', total)

    //         return {
    //             ...total,
    //             files: total.files.map((f) => {
    //                 if (f.size === 0) {
    //                     return { ...f, size: fileTotals.find((t) => t.path === total.path)?.totalSize }
    //                 }

    //                 return f
    //             })
    //         }
    //     } else {
    //         return total
    //     }
    // }) 
}

process().then((result) => {
    // console.log(`Part one: ${inspect(result, false, 10, true)}`)
})