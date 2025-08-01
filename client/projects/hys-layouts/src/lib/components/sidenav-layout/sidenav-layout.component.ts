import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, linkedSignal, output, signal, TemplateRef, Type, viewChild, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { filter, map, shareReplay, tap } from 'rxjs';
import { HysBreakpointService } from '../../services';

export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  iconSet?: string;
}

export type SideMode = MatDrawerMode;

@Component({
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterModule,
    HysIconPositionDirective,
    HysButtonComponent,
  ],
  selector: 'hys-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'SidenavLayout',
  styleUrl: './sidenav-layout.component.scss',
})
export class HysSidenavLayoutComponent {
  readonly activatedRoute = inject(ActivatedRoute, { skipSelf: true });
  readonly router = inject(Router);
  readonly bp = inject(HysBreakpointService);
  sideNavComponent = viewChild<MatSidenav>('sidenav');

  navConfig = input<NavItem[]>();

  mainTemplate = contentChild<TemplateRef<unknown>>('main');
  logoTemplate = contentChild<TemplateRef<unknown>>('logo');
  extraTemplate = contentChild<TemplateRef<unknown>>('extra');

  pageTitle = signal<string>('');
  pageSubTitle = signal<string>('');

  isHandset$ = this.bp.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait
  ]).pipe(
    map(result => result.matches),
    shareReplay(),
  );

  globalAction = viewChild('globalAction', { read: ViewContainerRef });

  isSidebarCollapsed = input<boolean>(false);
  sidebarCollapsed = linkedSignal<boolean>(() => this.isSidebarCollapsed());

  sidebarCollapsedChange = output<boolean>();

  open(): void {
    this.sideNavComponent()?.open();
  }

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => {
        this.globalAction()?.clear();
      }),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      takeUntilDestroyed(),
    ).subscribe((route) => {
      this.pageTitle.set(route.snapshot.title?.toString() || '');
      this.pageSubTitle.set(route.snapshot.data['subTitle'] || '');
      const component: () => Promise<Type<unknown>> = route.snapshot.data['component'];
      if (component) {
        component().then(c => {
          this.globalAction()?.createComponent(c);
        });
      }
    });
  }

  toggleDesktopSidebarState() {
    this.sidebarCollapsed.update(value => !value);
    this.sidebarCollapsedChange.emit(this.sidebarCollapsed());
  }
}
