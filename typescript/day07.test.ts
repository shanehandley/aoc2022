import * as load from './index'
import * as fs from 'fs'
import * as d from './day07'

describe('day 07', () => {
    describe('Part 01', () => {
        // beforeEach(() => {
        //     jest.spyOn(load, 'loadInput').mockImplementation(async () => {
        //         return fs.readFileSync(`day07-test.txt`)
        //     })
        // })

        it('Collects path information up to the next command line', () => {
            const lines = [
                '$ cd /',
                '$ ls',
                'dir a',
                '14848514 b.txt',
                '8504156 c.dat',
                'dir d',
                '$ cd a',
            ]

            expect(d.processPath(lines, 0)).toEqual({
                files: [
                    {
                        name: 'a',
                        type: 'directory',
                        size: 0
                    },
                    {
                        name: 'b.txt',
                        type: 'file',
                        size: 14848514
                    },
                    {
                        name: 'c.dat',
                        type: 'file',
                        size: 8504156
                    },
                    {
                        name: 'd',
                        type: 'directory',
                        size: 0
                    },
                ],
                path: expect.anything(),
                totalSize: 0
            })
        })

        it('Collects path information up to the next command line when all files are directories', () => {
            const lines = [
                '$ cd sgjtm',
                '$ ls',
                'dir dnznpj',
                'dir jzsntnbs',
                'dir nqgcbd',
                'dir vdg',
                '$ cd dnznpj'
            ]

            expect(d.processPath(lines, 0)).toEqual({
                files: [
                    {
                        name: 'dnznpj',
                        type: 'directory',
                        size: 0
                    },
                    {
                        name: 'jzsntnbs',
                        type: 'directory',
                        size: 0
                    },
                    {
                        name: 'nqgcbd',
                        type: 'directory',
                        size: 0
                    },
                    {
                        name: 'vdg',
                        type: 'directory',
                        size: 0
                    },
                ],
                path: expect.anything(),
                totalSize: 0
            })
        })
    })
})
