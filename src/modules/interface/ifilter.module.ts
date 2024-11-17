export interface IFilterModule {
    /**
     * 
     * @param maskSize the kernel size to overlay the rgb[][]
     * @returns return the object value that applied median filter
     */
    medianFilter: (maskSize: number) => TransformType

    /**
     * 
     * @returns return the object value that applied average filter
     */
    averageFilter: () => TransformType
}