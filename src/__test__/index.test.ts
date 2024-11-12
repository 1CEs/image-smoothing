import { expect, test, describe } from 'bun:test'
import { FilterModule } from '../modules/filter.module'
import { ImageModule } from '../modules/image.module'

describe('salt_test', async () => {
    for (let i = 1; i <= 3; i++) {
        const imagePath = `images/salt/salt${i}.png`
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()
        test(`salt_${i}`, async () => {
            const filterModule = new FilterModule(transformed)
            const filtered = imageModule.apply(filterModule, 1, 'median')

            expect(await imageModule.build(filtered)).toBe(`Image saved to output/salt/salt${i}.png`)
        })
    }

})

describe('gaussian_test', async () => {
    for (let i = 1; i <= 3; i++) {
        const imagePath = `images/gaussian/gaussian${i}.png`
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()
        test(`gaussian_${i}`, async () => {
            const filterModule = new FilterModule(transformed)
            const filtered = imageModule.apply(filterModule, 3, 'average')

            expect(await imageModule.build(filtered)).toBe(`Image saved to output/gaussian/gaussian${i}.png`)
        })
    }

})