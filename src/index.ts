import { FilterModule } from "./modules/filter.module"
import { ImageModule } from "./modules/image.module"

(async () => {
    await main()
})()

async function main() {
    try {
        console.log('Running script')
        const imagePath = 'images/gaussian/gaussian3.png'
        const imageModule = new ImageModule(imagePath)
        const transformed = await imageModule.transform()

        const filterModule = new FilterModule(transformed)
        const filtered = imageModule.apply(filterModule, 3, "average")

        const saved = await imageModule.build(filtered)
        console.log(saved)
    } catch (error) {
        console.log('Err:', error)
    }
}