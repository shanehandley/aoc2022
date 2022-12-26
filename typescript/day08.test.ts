import * as load from './index'
import * as d from './day08'

describe('day 08', () => {
    describe('Part 01', () => {
        it('extracting rows with equal indices for x and y', () => {
            /**
             * 22222
             * 11111
             * 11111
             * 11111
             * 22222
             */
            const lines = ['22222', '11111', '11111', '11111', '22222']

            expect(d.extractTrees(lines, '1', 1, 1)).toStrictEqual({
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

            expect(d.extractTrees(lines, '1', 2, 1)).toStrictEqual({
                north: [2, 1],
                east: [1],
                south: [1, 2],
                west: [1, 1, 1]
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

            await expect(d.process()).resolves.toEqual(12)
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

            await expect(d.process()).resolves.toEqual(16)
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

            await expect(d.process()).resolves.toEqual(21)
        })
    })
})
