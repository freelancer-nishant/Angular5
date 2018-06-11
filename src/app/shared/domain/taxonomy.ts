export interface TaxonomyType {
    id,
    context_id,
    name,
    label,
    icon,
    all_clients_flag,
    all_roles_flag,
    client_ids,
    role_ids
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