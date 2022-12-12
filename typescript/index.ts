import * as fs from 'fs'

export const loadInput = async (day: string): Promise<Buffer> => fs.readFileSync(`day${day}.txt`)
