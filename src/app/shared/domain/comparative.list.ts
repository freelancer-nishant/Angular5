//export interface ComparativeListItem {
//    id,
//    us_school_id,
//    school_label,
//    alias,
//    target_flag,
//}


export interface ComparativeListItem {
    id,
    name,
    label,
    desc,
    school_id,
    base_school_id,
    base_school_name,
    items: ComparativeItem[]
}
export interface ComparativeItem {
    id,
    us_school_id,
    school_label,
    alias,
    target_flag,
    school_code,
    state_school_code
}
