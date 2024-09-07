import { Routes } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '', component: PhaserGame},
    { path: 'resume', component: ResumeComponent },   
    { path: 'contact', component: ContactComponent},
];
