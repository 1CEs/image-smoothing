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
        console.log(filterModule.medianFilter().pixels)
    } catch (error) {
        console.log('Err:', error)
    }
}