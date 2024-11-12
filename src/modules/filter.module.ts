import type { IFilterModule } from "./interface/ifilter.module"

export class FilterModule implements IFilterModule {
    constructor(private _transformedImage: TransformType) { }

    public set transformedImage(transformed: TransformType) {
        this._transformedImage = transformed
    }

    medianFilter(maskSize: number = 3) {
        const halfMaskSize = Math.floor(maskSize / 2)
        const { width, height, pixels } = this._transformedImage
        const filtered: number[][] = []

        for (let y = 0; y < height; y++) {
            const row: number[] = []
            for (let x = 0; x < width; x++) {
                const neighbors: number[] = []

                for (let ky = -halfMaskSize; ky <= halfMaskSize; ky++) {
                    for (let kx = -halfMaskSize; kx <= halfMaskSize; kx++) {
                        const nx = x + kx
                        const ny = y + ky

                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            neighbors.push(pixels[ny][nx])
                        }
                    }
                }

                neighbors.sort((a, b) => a - b)
                const median = neighbors[Math.floor(neighbors.length / 2)]

                row.push(median)
            }
            filtered.push(row)
        }

        return { ...this._transformedImage, pixels: filtered }
    }

    averageFilter(maskSize: number = 3) {
        const halfMaskSize = Math.floor(maskSize / 2)
        const { width, height, pixels } = this._transformedImage
        const filtered: number[][] = []

        for (let y = 0; y < height; y++) {
            const row: number[] = []
            for (let x = 0; x < width; x++) {
                let sum = 0
                let count = 0

                for (let ky = -halfMaskSize; ky <= halfMaskSize; ky++) {
                    for (let kx = -halfMaskSize; kx <= halfMaskSize; kx++) {
                        const nx = x + kx
                        const ny = y + ky

                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            sum += pixels[ny][nx]
                            count++
                        }
                    }
                }

                const average = Math.floor(sum / count)
                row.push(average)
            }
            filtered.push(row)
        }

        return { ...this._transformedImage, pixels: filtered }
    }
}