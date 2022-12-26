import { inspect } from 'util'
import { loadInput } from './index'

const process = async () => {
    const data = await loadInput('07')
    const lines = data.toString().split(/[\n]/)

    const result = ''

    for (const [_, line] of lines.entries()) {
        // ...
    }

    return result
}

process().then((result) => console.log(`Part one: ${inspect(result)}`))