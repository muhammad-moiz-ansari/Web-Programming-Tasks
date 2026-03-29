import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.componenet'
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component'
import { FeedbackComponent } from './feedback/feedback.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // default route
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    // Component routes
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'feedback', component: FeedbackComponent},

    // wildcard route for 404 not found page
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }