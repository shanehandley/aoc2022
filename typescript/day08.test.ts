import * as load from './index'
import * as d from './day08'

describe('day 08', () => {
    describe.skip('Part 01', () => {
        it('extracting rows with equal indices for x and y', () => {
            /**
             * 22222
             * 11111
             * 11111
             * 11111
             * 22222
             */
            const lines = ['22222', '11111', '11111', '11111', '22222']

            expect(d.extractTrees(lines, 1, 1)).toStrictEqual({
                north: [2],
                east: [1],
                south: [1, 1, 2],
                west: [1, 1, 1]
            })
        })

        it('extracting rows without equal indices ', () => {
            /**
             * 22222
             * 11111
             * 11111
             * 11111
             * 22222
             */
            const lines = ['22222', '11111', '11111', '11111', '22222']

            expect(d.extractTrees(lines, 2, 1)).toStrictEqual({
                north: [2, 1],
                east: [1],
                south: [1, 2],
                west: [1, 1, 1]
            })
        })

        it('extracting larger sets', () => {
            const lines = [
                '20011111042034112',
                '00112330000312101',
                '31121024123002430',
                '31322014343240021',
                '10233024313120200',
                '12020020200441142', // 12020020_2_00441142
                '13100024244112434',
                '11414322444450442'
            ]

            expect(d.extractTrees(lines, 5, 8)).toStrictEqual({
                north: [0, 0, 1, 3, 3],
                east: [1, 2, 0, 2, 0, 0, 2, 0],
                south: [2, 4],
                west: [0, 0, 4, 4, 1, 1, 4, 2]
            })
        })

        it('for no internally visible trees (3 x 5', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * Exterior = 12, then 0 interior
                 * 
                 * 22222
                 * 11111
                 * 22222
                 */

                return Promise.resolve(Buffer.from('22222\n11111\n22222'))
            })

            await expect(d.partOne()).resolves.toEqual(12)
        })

        it('for no internally visible trees (5 x 5)', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * Exterior = 16, then 0 interior
                 * 
                 * 22222
                 * 11111
                 * 11111
                 * 11111
                 * 22222
                 */

                return Promise.resolve(Buffer.from('22222\n11111\n11111\n11111\n22222'))
            })

            await expect(d.partOne()).resolves.toEqual(16)
        })

        it('calculates for larger sets', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * length = 17 = (34)
                 * height = 8 (16)
                 * 
                 * exterior = 50
                 * 
                 * 20011111042034112
                 * 00112330000312101 .010111000010000. = 5
                 * 31121024123002430 .101000110000011. = 6 // 11
                 * 31322014343240021 .010000111001001. = 6 // 17
                 * 10233024313120200 .
                 * 12020020200441142 .
                 * 13100024244112434 .
                 * 11414322444450442
                 */

                return Promise.resolve(Buffer.from('20011111042034112\n00112330000312101\n31121024123002430\n31322014343240021\n10233024313120200\n12020020200441142\n13100024244112434\n11414322444450442'))
            })

            await expect(d.partOne()).resolves.toEqual(78)
        })

        it('Calculates visibility of test data correctly', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * 30373 (5) = 5
                 * 25512 2: (1) + 5: (1) + 5: (1) + 1: (0) + 2 (1) = 4
                 * 65332
                 * 33549
                 * 35390 (5) = 7
                 */
                return Promise.resolve(Buffer.from('30373\n25512\n65332\n33549\n35390'))
            })

            await expect(d.partOne()).resolves.toEqual(21)
        })
    })

    describe('part 02', () => {
        fit('calculates a simple case', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * 11111
                 * 22222
                 * 11111
                 */
                return Promise.resolve(Buffer.from('11111\n22222\n11111'))
            })

            await expect(d.partTwo()).resolves.toEqual(1)
        })

        it('calculates the example correctly', async () => {
            jest.spyOn(load, 'loadInput').mockImplementation(async () => {
                /**
                 * 30373
                 * 25512
                 * 65332
                 * 33549
                 * 35390
                 */
                return Promise.resolve(Buffer.from('30373\n25512\n65332\n33549\n35390'))
            })

            await expect(d.partTwo()).resolves.toEqual(8)
        })
    })
})
