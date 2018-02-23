import { Injectable } from '@angular/core';

@Injectable()
export class VJSConfig {

    userAuth = {
        name: "jasperadmin",
        password: "jasperadmin"
    };

    resourceDetails = [{
        id: "enrollmentdashboard",
        type: "report",
        uri: "/CF/Dashboard/Enrollment_Dashboard/EnrollmentDashboard"
    }];

};