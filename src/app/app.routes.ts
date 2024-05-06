import { Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessageComponent } from './components/message/message.component';
import { NotificationComponent } from './components/notification/notification/notification.component';
import { OwnerHomeComponent } from './components/owner/owner-home/owner-home.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { TestComponent } from './components/test/test.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "register", component: RegisterComponent},
    {path: "room-detail", component: RoomDetailComponent},
    {path: "user-info", component: UserInfoComponent},
    {path: "admin-home", component: AdminHomeComponent},
    {path: "owner-home", component: OwnerHomeComponent},
    {path: "notification", component: NotificationComponent},
    {path: "message", component: MessageComponent},
];
