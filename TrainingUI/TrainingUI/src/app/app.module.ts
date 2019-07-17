import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { DeleteTrainingComponent } from './delete-training/delete-training.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrainingService } from './training.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewTrainingComponent,
    AddTrainingComponent,
    EditTrainingComponent,
    DeleteTrainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
