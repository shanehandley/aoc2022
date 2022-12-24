// import * as load from './index'
import * as d from './day04'

describe('day 04', () => {
    describe('range', () => {
        it('correct', () => {
            expect(d.range('1', '2')).toEqual([1, 2])
            expect(d.range('1', '4')).toEqual([1, 2, 3, 4])
            expect(d.range('4', '8')).toEqual([4, 5, 6, 7, 8])
            expect(d.range('2', '9')).toEqual([2, 3, 4, 5, 6, 7, 8, 9])
        })
    })
})
