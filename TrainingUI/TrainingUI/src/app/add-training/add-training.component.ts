import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainingService } from '../training.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { disableDebugTools } from '@angular/platform-browser';
import Training from '../Training';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
  angForm: FormGroup;
  ErrorMessage: string;
  InformationMessage: string;
  TrainingNameErrorMessage: string;
  StartDateErrorMessage: string;
  EndDateErrorMessage: string;
  constructor(private fb: FormBuilder, private ps: TrainingService) {
    this.CreateForm();
  }

  CreateForm() {
    this.angForm = this.fb.group({
      TrainingName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required]
    });
    this.InformationMessage = "";
    this.ErrorMessage = "";
    this.StartDateErrorMessage = "";
    this.EndDateErrorMessage = "";
    this.TrainingNameErrorMessage = "";
  }

  addTrainingRecord(trainingName, inputStartDate, inputEndDate) {
    this.ErrorMessage = "";
    this.InformationMessage = "";
    var startDate = new Date(inputStartDate);
    var endDate = new Date(inputEndDate);

    if (endDate >= startDate) {
      this.ErrorMessage = "";
      var message = this.ps.addTraining(trainingName, inputStartDate, inputEndDate);
      if (message.includes("Error:")) {
        this.ErrorMessage = message;
      }
      else {
        this.InformationMessage = message;
      }
      return true;
    }
    else {
      this.ErrorMessage = "End Date must be greater than or equal to Start Date";
      //alert('End Date must be greater than or equal to Start Date');
      return false;
    }
    
  }

  validateTrainingName(inputName) {
    this.TrainingNameErrorMessage = "";
    var rxSpacePattern = /^( )*$/;
    if (inputName.match(rxSpacePattern) != null || inputName.Lengh==0) {
      this.TrainingNameErrorMessage = "Training name can't be empty.";
      return false;
    }
    var pattern = /[A-Za-z0-9]/gi;
    if (!(inputName.search(pattern) > -1)) {
      this.TrainingNameErrorMessage = "Training name can't have all special characters";
      return false;
    }
  }

  isValidDate(inputDate) {
    var currVal = inputDate;
    if (currVal == '')
      return false;

    var date = new Date();
    var year = date.getFullYear().toString();

    var month = (date.getMonth() + 1);
    var stringMonth;
    if (month < 10)
      stringMonth = '0' + date.getMonth().toString()
    else
      stringMonth = date.getMonth().toString()

    var day;
    if (date.getDate() < 10)
      day = '0' + date.getDate().toString()
    else
      day = date.getDate().toString()

    var today = year + '-' + stringMonth + '-' + day;

    if (currVal < today) {
      return false;
    }

    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
    var dtArray = currVal.match(rxDatePattern);

    if (dtArray == null)
      return false;

    var dtMonth = dtArray[3];
    var dtDay = dtArray[5];
    var dtYear = dtArray[1];

    if (dtMonth < 1 || dtMonth > 12)
      return false;
    else if (dtDay < 1 || dtDay > 31)
      return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
      return false;
    else if (dtMonth == 2) {
      var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
      if (dtDay > 29 || (dtDay == 29 && !isleap))
        return false;
    }
    return true;
  }

  validateStartDate(inputDate) {
    this.StartDateErrorMessage = "";
    if (this.isValidDate(inputDate)) {
      this.StartDateErrorMessage = "";
      return true;
    }
    else {
      this.StartDateErrorMessage = "Either start date entered is invalid or past date.";
      return false;
    }
  }

  validateEndDate(inputDate) {
    this.EndDateErrorMessage = "";
    if (this.isValidDate(inputDate)) {
      this.EndDateErrorMessage = "";
      return true;
    }
    else {
      this.EndDateErrorMessage = "Either end date entered is invalid or past date.";
      return false;
    }
  }

  ngOnInit() {
  }

}
