import { FinderModule } from './pages/finder/finder.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'livros-supero', pathMatch: 'full' },
	{ path: 'livros-supero', loadChildren: () => FinderModule }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
