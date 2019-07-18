import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  url = environment.baseUrl + 'Training/SaveTraining';

  constructor(private http: HttpClient) { }

  addTraining(trainingName, startDate, endDate): string {

    let requestbody: string = "";

    let parameters: HttpParams = new HttpParams();
    parameters = parameters.append("trainingName", trainingName);
    parameters = parameters.append("startDate", startDate.toString());
    parameters = parameters.append("endDate", endDate.toString());

    let headerValues: HttpHeaders = new HttpHeaders();
    headerValues = headerValues.append("Content-Type", "text/plain");

    let message: string = "";

    this.http.post(this.url, requestbody, { headers: headerValues, params: parameters })
      //this.http.post(this.url, requestbody, { params: parameters })
      .subscribe(
        (data) => {
          //alert("Training has been confirmed for a duration of N days");
          console.log("Response:" + data.toString());
          message = data.toString();
        },
        (error) => {
          console.log("Error:" + error);
          message = "Error:" + error;
          //alert(message);
        }
      );

    return message;
  }
}
