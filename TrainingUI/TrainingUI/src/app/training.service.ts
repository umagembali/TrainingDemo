import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  url = 'http://localhost:58426/api/Training/SaveTraining';

  constructor(private http: HttpClient) { }

  addTraining(trainingName, startDate, endDate) {

    let requestbody: string = "";

    let parameters: HttpParams = new HttpParams();
    parameters = parameters.append("trainingName", trainingName);
    parameters = parameters.append("startDate", startDate.toString());
    parameters = parameters.append("endDate", endDate.toString());
    
    //let headerValues: HttpHeaders = new HttpHeaders();
    //headerValues = headerValues.append("Access-Control-Allow-Origin", "*");
    //headerValues = headerValues.append("Access-Control-Allow-Methods", "POST");
    //headerValues = headerValues.append("Access-Control-Allow-Headers", "accept, content-type");
    //headerValues = headerValues.append("Access-Control-Max-Age", "1728000");

    let message: string;
    message = ""; 

    //this.http.post(this.url, requestbody, { headers: headerValues, params: parameters })
    this.http.post(this.url, requestbody, { params: parameters })
      .subscribe(
        (data) => {
          alert("service call completed");
          alert("Training has been confirmed for a duration of N days");
          console.log("Response:" + data.toString());
          message = data.toString();
        },
        (error) => {
          console.log("Error:" + error);
          message = "Error:" + error;
          alert(message);
      }
    );

    return message;
  }
}
