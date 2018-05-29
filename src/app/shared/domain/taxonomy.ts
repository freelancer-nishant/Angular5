export interface TaxonomyType {
    id,
    name,
    label,
    icon
}
export interface ItemDetail {
    id: number,
    name: string,
    label: string,
    report_path: string,
    is_pagination: boolean,
    component_name: string,
    vjsParam: VJSParams[]
}
export interface VJSParams {
    component_out_param: string,
    report_param: string
}