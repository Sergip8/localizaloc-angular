export interface SelectData{
    default: string
    type: "single"|"multiple"
    search: boolean
    showLabel : boolean
    list: string[] | number[]
}
