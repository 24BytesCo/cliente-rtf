import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./views/pages/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./views/pages/ui-components/ui-components.module').then(
            (m) => m.UiComponentsModule
          ),
      },
      {
        path: 'advanced-ui',
        loadChildren: () =>
          import('./views/pages/advanced-ui/advanced-ui.module').then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: 'form-elements',
        loadChildren: () =>
          import('./views/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule
          ),
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () =>
          import(
            './views/pages/advanced-form-elements/advanced-form-elements.module'
          ).then((m) => m.AdvancedFormElementsModule),
      },
      {
        path: 'charts-graphs',
        loadChildren: () =>
          import('./views/pages/charts-graphs/charts-graphs.module').then(
            (m) => m.ChartsGraphsModule
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./views/pages/tables/tables.module').then(
            (m) => m.TablesModule
          ),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/pages/icons/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./views/pages/general/general.module').then(
            (m) => m.GeneralModule
          ),
      },
      {
        path: 'equipos',
        loadChildren: () =>
          import('./views/pages/equipos/equipos.module').then(
            (m) => m.EquiposModule
          ),
      },
      {
        path: 'casos',
        loadChildren: () =>
          import('./views/pages/casos/casos.module').then((m) => m.CasosModule),
      },
      {
        path: 'tecnicos',
        loadChildren: () =>
          import('./views/pages/tecnicos/tecnicos.module').then(
            (m) => m.TecnicosModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-rtf/admin-rtf.module').then((m) => m.AdminRtfModule),
  },

  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
