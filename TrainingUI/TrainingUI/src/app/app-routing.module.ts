import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { DeleteTrainingComponent } from './delete-training/delete-training.component';

const routes: Routes = [
  {
    path: 'training/view',
    component: ViewTrainingComponent
  },
  {
    path: 'training/add',
    component: AddTrainingComponent
  },
  {
    path: 'training/edit',
    component: EditTrainingComponent
  },
  {
    path: 'training/delete',
    component: DeleteTrainingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
