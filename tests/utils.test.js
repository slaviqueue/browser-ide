import assert from 'assert'
import { removeLastLine, log, generageContainerName, id } from '../utils'

describe('utils', () => {
    describe('#removeLastLine()', () => {
        it('takes multiline string and removes last line from it', () => {
            const sampleString = `\
                There's a bluebird in my heart that wants to get out,
                but I'm too tough for him.
                I say stay in there, I'm not going to let anybody see you.
                There's a bluebird in my heart that wants to get out,
                but I pour whiskey on him and inhale cigarette smoke,
            `
    
            assert.equal(removeLastLine(sampleString).split('\n').length, 4)
        })
    })

    describe('#log()', () => {
        it('as in elmlang, log takes an argument, logs it to console and returns it', () => {
            const sampleString = 'some sample text'

            assert.equal(log(sampleString), sampleString)
        })
    })

    describe('#generageContainerName', () => {
        it('generates unique name for creatable docker container', () => {
            const firstContainerName = generageContainerName('nodejs')
            const secondContainerName = generageContainerName('nodejs')

            assert.notEqual(firstContainerName, secondContainerName)
        })
    })

    describe('#id', () => {
        it('returns passed argument', () => {
            assert.equal(id(1), 1)
        })
    })
})
