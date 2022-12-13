import * as load from './index'
import * as d from './day02'

describe('day 02', () => {
    jest.spyOn(load, 'loadInput').mockImplementation(async () => {
        return Promise.resolve(Buffer.from('A Y\nB X\nC Z'))
    })

    it('Part 1', async () => {
        await expect(d.partOne()).resolves.toEqual(15)
    })

    describe('part 1', () => {
        it('getOutcome', async () => {
            expect(d.getResponse('A', 'Y')).toBe(4)
        })

        it('Part 2', async () => {
            await expect(d.partTwo()).resolves.toEqual(12)
        })
    })
})
