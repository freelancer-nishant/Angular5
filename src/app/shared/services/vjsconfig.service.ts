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
            uri: "/CF/Dashboard/Enrollment_Dashboard/EnrollmentDashboard",
            paging: false
        },
        {
            id: "attendancedashboard",
            type: "report",
            uri: "/CF/Dashboard/Attendance_Dashboard/attendance_dashboard",
            paging: false
        },
        {
            id: "sbac-overview",
            type: "report",
            uri: "/CF/Dashboard/State_Testing/State_Testing",
            paging: false
        },
        {
            id: "sbac-detail",
            type: "report",
            uri: "/CF/Dashboard/State_Testing_Details/State_Testing_Details",
            paging: false
        },
        {
            id: "pft-overview",
            type: "report",
            uri: "/CF/Dashboard/Physical_Fitness_Test/Physical_Fitness_Test",
            paging: false
        },
        {
            id: "celdt-overview",
            type: "report",
            uri: "/CF/Dashboard/CELDT/CELDT",
            paging: false
        },
        {
            id: "nwea-overview",
            type: "report",
            uri: "/CF/Dashboard/NWEA_Assessments/NWEA_Assessments",
            paging: false
        },
        {
            id: "fora-adam-overview",
            type: "report",
            uri: "/CF/Dashboard/DORA_and_ADAM_Assessments/DORA_and_ADAM_Assessments",
            paging: false
        },
        {
            id: "doma-overview",
            type: "report",
            uri: "/CF/Dashboard/DOMA_Algebra_Assessment/DOMA_Algebra_Assessment",
            paging: false
        },
        {
            id: "school-scorecard",
            type: "report",
            uri: "/CF/Reports/School_Card_Report",
            paging: false
        },
        {
            id: "sabc-scorecard",
            type: "report",
            uri: "/CF/Reports/Comparative_Schools_SBAC_results_report",
            paging: true
        },
        {
            id: "comparare-school-scorecard",
            type: "report",
            uri: "/CF/Reports/School_Card_Report",
            paging: true
        }
    ];

    exportFormats: MenuItem[] = [
            { label: 'pdf', icon: 'fa-file-pdf-o' },
            { label: 'xlsx', icon: 'fa-file-excel-o' },
            { label: 'xls', icon: 'fa-file-excel-o' },
            { label: 'docx', icon: 'fa-file-word-o' }
        ];
};