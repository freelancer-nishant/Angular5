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
