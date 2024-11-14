import type { IFilterModule } from "./interface/ifilter.module"

export class FilterModule implements IFilterModule {
    constructor(private _transformedImage: TransformType) { }

    public set transformedImage(transformed: TransformType) {
        this._transformedImage = transformed
    }

    medianFilter(maskSize: number = 3) {
        const halfMaskSize = Math.floor(maskSize / 2)
        const { width, height, pixels } = this._transformedImage
        const filtered: number[][] = Array.from({ length: height }, () => Array(width).fill(0))

        for (let row = 1; row < height; row++) {
            for (let col = 1; col < width; col++) {

                // Create the 3x3 filter mask
                const mask: number[] = []
                for (let i = -halfMaskSize; i <= halfMaskSize; i++) {
                    for (let j = -halfMaskSize; j <= halfMaskSize; j++) {
                        const neighborRow = row + i;
                        const neighborCol = col + j;
                        if (
                            neighborRow >= 0 &&
                            neighborRow < height &&
                            neighborCol >= 0 &&
                            neighborCol < width
                        ) {
                            mask.push(pixels[neighborRow][neighborCol])
                        }
                    }
                }

                // Sorted the neighbors pixels and set the mid pixel into the filtered array
                const sortedNeighbors = mask.sort((a, b) => a - b)
                const median = sortedNeighbors[Math.floor(sortedNeighbors.length / 2)]
                filtered[row][col] = median;
            }
        }

        return { ...this._transformedImage, pixels: filtered }
    }

    averageFilter(maskSize: number = 3) {
        const { width, height, pixels } = this._transformedImage
        const offset = Math.floor(maskSize / 2)
        const filtered: number[][] = Array.from(Array(height), () => Array(width).fill(0))

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let sum = 0
                let count = 0
                for (let ky = -offset; ky <= offset; ky++) {
                    for (let kx = -offset; kx <= offset; kx++) {
                        const ny = y + ky
                        const nx = x + kx
                        if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                            sum += pixels[ny][nx]
                            count++
                        }
                    }
                }
                filtered[y][x] = Math.floor(sum / count)
            }
        }

        return { ...this._transformedImage, pixels: filtered }
    }
}