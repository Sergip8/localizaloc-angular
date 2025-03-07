export class Filter {
    page: number = 0
    size: number = 16
    min: number|null = null
    max: number|null = null
    areaMin: number|null = null
    areaMax: number|null = null
    type: string[] = []
    barrio: string[] = []
    localidad: string| null = null
    antiguedad: string[] = []
    estrato: number[] = []
    order: any = null
    operation: string| null = null
    location: string| null = null
}