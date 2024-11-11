export interface IFilterModule {
    
    medianFilter: (maskSize: number) => TransformType
    averageFilter: () => TransformType
}