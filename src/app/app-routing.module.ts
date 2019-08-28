import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WorkComponent } from './work/work.component';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'work',
  //   pathMatch: 'full'
  // },
   //{ path: '**', redirectTo: '',component: IndexComponent,  pathMatch: 'full' },
  {
    path: '',
    component: IndexComponent
},
  {
      path: 'work',
      component: WorkComponent
  },
  {
    path: 'about',
    component: AboutComponent
},
{
  path: 'contact',
  component: ContactComponent
},
{
  path: 'testimonials',
  component: TestimonialsComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
