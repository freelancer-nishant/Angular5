import { Injectable } from '@angular/core';

@Injectable()
export class VJSConfig {

    userAuth = {
        name: "jasperadmin",
        password: "jasperadmin"
    };

    resourceDetails = [
        {
            id: "enrollmentdashboard",
            type: "report",
            uri: "/CF/Dashboard/Enrollment_Dashboard/EnrollmentDashboard"
        },
        {
            id: "attendancedashboard",
            type: "report",
            uri: "/CF/Dashboard/Attendance_Dashboard/attendance_dashboard"
        },
        {
            id: "sbac-overview",
            type: "report",
            uri: "/CF/Dashboard/Testing_Dahboard/Testing_Dahboard"
        },
        {
            id: "sbac-detail",
            type: "report",
            uri: "/CF/Dashboard/State_Testing_Details/State_Testing_Details"
        },
        {
            id: "pft-overview",
            type: "report",
            uri: "/CF/Dashboard/Physical_Fitness_Test/Physical_Fitness_Test"
        },
        {
            id: "celdt-overview",
            type: "report",
            uri: "/CF/Dashboard/CELDT/CELDT"
        },
        {
            id: "nwea-overview",
            type: "report",
            uri: "/CF/Dashboard/NWEA_Assessments/NWEA_Assessments"
        },
        {
            id: "fora-adam-overview",
            type: "report",
            uri: "/CF/Dashboard/DORA_and_ADAM_Assessments/DORA_and_ADAM_Assessments"
        },
        {
            id: "doma-overview",
            type: "report",
            uri: "/CF/Dashboard/DOMA_Algebra_Assessment/DOMA_Algebra_Assessment"
        }
    ];

};