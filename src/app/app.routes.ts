import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Store } from './pages/store/store';
import { Contact } from './pages/contact/contact';
import { NgModule } from '@angular/core';
import { Single } from './pages/single/single';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'store', component: Store },
  { path: 'contact', component: Contact },
  { path: 'single', component: Single },
  { path: 'single/:id', component: Single }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
