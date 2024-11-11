import { FilterModule } from "./modules/filter.module"
import { ImageModule } from "./modules/image.module"

(async () => {
    await main()
})()

async function main() {
    try {
        const imagePath = 'images/salt/salt1.png'
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()

        const filterModule = new FilterModule(transformed)
        const filtered = imageModule.apply(filterModule, 1, 'median')

        const saved = await imageModule.build('output.png', filtered)
        console.log(saved)
    } catch (error) {
        console.log('Err:', error)
    }
}