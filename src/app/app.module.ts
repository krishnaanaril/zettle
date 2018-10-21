import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Mine
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
// import { MaterialModule } from './material/material.module'; // Commented for now as we are proceeding with bootstrap at the moment

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FriendsComponent,
    GroupsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,    
    // MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
