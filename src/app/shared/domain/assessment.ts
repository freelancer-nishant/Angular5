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

export interface AssessmentVersion {
    id: any,
    client_id: any,
    school_id: any,
    school_year_id: any,
    assessment_id: any,
    term_id: any,
    label: any,
    weekofkey: any,
}

export interface AssessmentSubject {
    id: any,
    assessment_type_id: any,
    subject: any,
    desc: any,
    label: any,
}

export interface AssessmentLevel {
    id: any,
    assessment_id: any,
    assessment_type_id: any;
    level: any,
    label: any,
}

export interface AssessmentSubjectStrand {
    id: any,
    assessment_id: any,
    name: any,
    label: any,
    desc: any,
    abbrev: any,
    threshold_exists: any,
    ignore_grade: any,
    test_match_code: any,
    substrand_exists: any,
}

export interface AssessmentVersionRequest {
    id: any,
    test_version_number: any,
    label: any;
}

export interface AssessmentSubjectSubStrand {

}