import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'post-detail/:id',
    loadChildren: () => import('./pages/post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  },
  {
    path: 'data-detail/:i',
    loadChildren: () => import('./pages/data-detail/data-detail.module').then( m => m.DataDetailPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
