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

export interface TaxonomyCategory {
    id,
    type_id,
    name,
    label,
    all_clients_flag,
    all_roles_flag,
    client_ids,
    user_id,
    icon,
    role_ids
}

export interface TaxonomyItem {
    id: number,
    name: string,
    label: string,
    report_path: string,
    is_pagination: boolean,
    component_name: string,
    component_out_param: string,
    report_param: string,
    content_type_id: number,//
    user_id: number,
    subcategory_id: number,
    content_target: string,
    all_clients_flag: boolean,
    all_roles_flag: boolean,
    client_ids: string,
    role_ids: string
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