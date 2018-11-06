import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Mine
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { NoSpaceDirective } from './shared/directive/no-space.directive';
import { MaterialModule } from './material/material.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; // Commented for now as we are proceeding with bootstrap at the moment

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FriendsComponent,
    GroupsComponent,
    HeaderComponent,
    AddUserComponent,
    SearchUserComponent,
    NoSpaceDirective,
    SignupFormComponent,
    LoginFormComponent,
    AddGroupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
