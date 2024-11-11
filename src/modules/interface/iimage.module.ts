export interface IImageModule {
    transform: () => Promise<TransformType>
    build: (fileName: string, filtered: TransformType) => Promise<string>
}