import type { IFilterModule } from "./interface/ifilter.module";

export class FilterModule implements IFilterModule {
    constructor(private _transformedImage: TransformType) { }

    medianFilter(maskSize: number = 3) {
        const halfMaskSize = Math.floor(maskSize / 2)
        const arr = this._reshapeArray()
        const { width, height } = this._transformedImage
        const filtered: number[] = []
        
        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                const neigbors: number[] = []

                for(let ky = - halfMaskSize; ky <= halfMaskSize; ky++) {
                    for(let kx = -halfMaskSize; kx <= halfMaskSize; kx++) {
                        const nx = x + kx
                        const ny = y + ky

                        if(nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            neigbors.push(arr[ny][nx])
                        }
                    }
                }

                neigbors.sort((a, b) => a - b)
                const median = neigbors[Math.floor(neigbors.length / 3)]

                filtered.push(median)
            }
        }

        return { ...this._transformedImage, pixels: filtered }
    }

    averageFilter() {
        const { width, height } = this._transformedImage
        const filtered: number[] = []
        return { ...this._transformedImage, pixels: filtered }
    }

    private _reshapeArray() {
        const { pixels, height, width } = this._transformedImage

        const array2D = []
        for (let y = 0; y < height; y++) {
            array2D.push(pixels.slice(y * width, (y + 1) * width))
        }
        return array2D
    }
}