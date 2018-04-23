import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { NominationComponent } from './nomination/index';
import { BallotComponent } from './ballot/index';
import { AdjudicatorComponent } from './adjudicator/index'
import { GetUsersComponent } from './get-users/index';
import { ElectionComponent } from './election/election.component';
import { AuthGuard } from './_guards/index';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateElectionComponent } from './create-election/create-election.component';
import { ManageElectionsComponent } from './manage-elections/manage-elections.component';
import { ManageNominationsComponent } from './manage-nominations/manage-nominations.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
// import { ElectionResolveService } from './election/election.resolve.guard';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomepageComponent, canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'nomination', component: NominationComponent },
            {
                path: 'adjhome', component: AdjudicatorComponent, canActivate: [AuthGuard]
                //children: [{ path: 'create-election', component: CreateElectionComponent }]
            },
            { path: 'myprofile', component: MyProfileComponent },
            {
                path: 'elections', component: ElectionComponent, canActivate: [AuthGuard]
                //children: [{ path: 'ballot', component: BallotComponent }]
            },
            { path: 'getusers', component: GetUsersComponent },
            { path: 'create-election', component: CreateElectionComponent },
            { path: 'manage-election', component: ManageElectionsComponent },
            { path: 'ballot/:id', component: BallotComponent },
            { path: 'manage-nomination', component: ManageNominationsComponent },
            { path: 'modal-popup', component: ModalPopupComponent },
            { path: '', redirectTo: 'adjhome', pathMatch:'full' }
        ]
    },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**File Nomination', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);

