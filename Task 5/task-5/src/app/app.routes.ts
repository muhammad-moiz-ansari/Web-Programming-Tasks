import { RouterModule, Routes } from '@angular/router';

import { Navbar } from './navbar/navbar';
import { Home } from './home/home'
import { About } from './about/about'
import { Login } from './login/login'
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // default route
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    // Component routes
    {path: 'navbar', component: Navbar},
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'login', component: Login},

    // wildcard route for 404 not found page
    {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }