import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Mine
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: 'friends', component: FriendsComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'friends', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
