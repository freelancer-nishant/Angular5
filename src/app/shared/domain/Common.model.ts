import { ComparativeItem } from './../../shared/domain/comparative.list'

export interface ResponseResult {
    statusCode: number,
    message: string,
    data: string,
    errors: ErrorModel[]       
}
export interface ErrorModel {
    title: string,
    message: string
}

export interface SchoolYear {
    id,
    school_year
}
export interface State {
    id,
    name,
    label
}
export interface City {
    city
}
export interface SchoolType {
    school_type_combined_id,
    school_type_combined
}

export class SchoolModel {
    state: number;
    county: number;
    district: number;
    city: string;
    schooltype: number;
    school: number;
}
export class SchoolListModel {
    selectedschools: ComparativeItem[];
    schoollabel: string;
    schoolyear: number;
}