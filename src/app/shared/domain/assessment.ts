export interface Assessment {
    id: any,
    test_type_name: any,
    description: any
}

export interface AssessmentRequest {
    id: any,
    assessment_id: any,
    name: any,
    desc: any
}

export interface AssessmentOfClient {
    id: any,
    assessment_id: any,
    assessment_name: any,
    client_id: any,
    client_name: any,
    desc: any
}

export interface AssessmentOfClientRequest {
    id: any,
    client_id: any,
    assessment_id: any,
}