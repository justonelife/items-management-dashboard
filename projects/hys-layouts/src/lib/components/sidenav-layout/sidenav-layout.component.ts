import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, inject, input, TemplateRef, viewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { map, shareReplay } from 'rxjs';
import { HysBreakpointService } from '../../services';

export interface NavItem {
  title: string;
  path: string;
  icon?: string;
}

export type SideMode = MatDrawerMode;

@Component({
  imports: [
    MatSidenavModule,
    CommonModule,
  ],
  selector: 'hys-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'SidenavLayout',
})
export class HysSidenavLayoutComponent {
  readonly bp = inject(HysBreakpointService);
  sideNavComponent = viewChild<MatSidenav>('sidenav');

  navConfig = input<NavItem[]>();

  mainTemplate = contentChild<TemplateRef<unknown>>('main');

  isHandset$ = this.bp.observe([
    Breakpoints.Handset,
    Breakpoints.TabletPortrait
  ]).pipe(
    map(result => result.matches),
    shareReplay(),
  );

  open(): void {
    this.sideNavComponent()?.open();
  }
}
