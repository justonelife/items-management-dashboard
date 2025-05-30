import { NgModule } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";

@NgModule({
  imports: [MatIconModule],
  providers: [MatIconRegistry]
})
export class IconModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.registerFontClassAlias(
      'filled',
      'material-icons mat-ligature-font size-20'
    );
    iconRegistry.registerFontClassAlias(
      'outlined',
      'material-symbols-outlined mat-ligature-font material-icons size-20' //TODO: find better way than hardcode size-20
    );
    iconRegistry.registerFontClassAlias(
      'symbols-outlined',
      'material-symbols-outlined'
    );
  }
}
