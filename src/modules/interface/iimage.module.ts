import type { FilterModule } from "../filter.module"

export interface IImageModule {
    transform: () => Promise<TransformType>
    build: (    filtered: TransformType) => Promise<string>
    apply: (callback: FilterModule, times: number, type: FilterType) => TransformType
}