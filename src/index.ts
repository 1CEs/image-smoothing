import { ImageModule } from "./modules/image.module"

(async () => {
    await main()
})()

async function main() {
    try {
        const imagePath = 'images/salt/salt1.png'
        const instance = new ImageModule(imagePath)
        const arrBuff = await instance.transform()
        const saved = await instance.build('output.png', arrBuff)
        console.log(saved)
    } catch (error) {
        console.log('Err:', error)
    }
}