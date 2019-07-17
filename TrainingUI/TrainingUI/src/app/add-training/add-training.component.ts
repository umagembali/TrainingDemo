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
  }

  addTrainingRecord(trainingName, inputStartDate, inputEndDate) {
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
    this.ErrorMessage = "";
    var rxSpacePattern = /^( )*$/;
    if (inputName.match(rxSpacePattern) != null) {
      this.ErrorMessage = "Training name can't be empty.";
    }
    //else {
    //  var rxDigitPattern = /^(\d)+$/;
    //  var rxAlphabetPattern = /^(\w)+$/;
    //  //var inputDigitArray = inputName.match(rxDigitPattern);
    //  //var inputAlphabetArray = inputName.match(rxAlphabetPattern);
    //  //if (inputDigitArray == null && inputAlphabetArray == null) {
    //  //  this.ErrorMessage = "Training name can't contain only special characters.";
    //  //}
    //  if ((inputName.search(rxDigitPattern) == -1) && (inputName.search(rxAlphabetPattern) == -1)) {
    //    this.ErrorMessage = "Training name can't contain only special characters.";
    //  }
    //}
  }

  isValidDate(inputDate) {
    var currVal = inputDate;
    if (currVal == '')
      return false;

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

  validateDate(inputDate) {
    if (this.isValidDate(inputDate)) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit() {
  }

}
