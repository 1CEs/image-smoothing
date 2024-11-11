import type { BunFile } from "bun";
import type { IImageModule } from "./interface/iimage.module";
import sharp from "sharp";

export class ImageModule implements IImageModule {
    private _file: BunFile

    constructor(imagePath: string) {
        this._file = Bun.file(imagePath)
    }

    async transform() {
        const arrBuff = await this._file.arrayBuffer()
        const buffer = Buffer.from(arrBuff)

        const image = sharp(buffer).grayscale()
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true })

        const gsPixels = []
        for(let i = 0; i < data.length; i++) {
            const intensity = data[i]
            gsPixels.push(intensity)
        }

        return {
            width: info.width,
            height: info.height,
            pixels: gsPixels
        }
    }

    async build(fileName: string, filtered: TransformType) {
        const buffer = Buffer.from(filtered.pixels)

        await sharp(buffer, {
            raw: {
                width: filtered.width,
                height: filtered.height,
                channels: 1
            }
        }).toFile('output/' + fileName)

        return `Image saved to output/${fileName}` 
    }

}