import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

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
            uri: "/CF/Dashboard/State_Testing/State_Testing"
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
        },
        {
            id: "school-scorecard",
            type: "report",
            uri: "/CF/Reports/School_Card_Report"
        },
        {
            id: "sabc-scorecard",
            type: "report",
            uri: "/CF/Reports/Comparative_Schools_SBAC_results_report"
        },
        {
            id: "comparare-school-scorecard",
            type: "report",
            uri: "/CF/Reports/School_Card_Report"
        }
    ];

    exportFormats: MenuItem[] = [{
        icon: 'fa-download',
        items: [
            { label: 'pdf', icon: 'fa-file-pdf-o' },
            { label: 'xlsx', icon: 'fa-file-excel-o' },
            { label: 'xls', icon: 'fa-file-excel-o' },
            { label: 'docx', icon: 'fa-file-word-o' }
        ]
    }];
};