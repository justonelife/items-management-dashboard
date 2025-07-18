import { patchState, signalStore, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { AppTheme } from "../types"
import { effect, inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { APP_THEME_KEY } from "../const";

type AppState = {
  theme: AppTheme;
}

const initialState: AppState = {
  theme: 'light'
}

export const AppStore = signalStore(
  withState(initialState),
  withProps(() => ({
    themeKey: inject(APP_THEME_KEY),
    document: inject(DOCUMENT),
  })),
  withMethods((store) => ({
    setTheme(theme: AppTheme): void {
      patchState(store, { theme });
    },
    restoreThemeFromLocalStorage(): void {
      const storedTheme = localStorage.getItem(store.themeKey);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        patchState(store, { theme: storedTheme });
      }
    }
  })),
  withHooks({
    onInit({ restoreThemeFromLocalStorage, theme, themeKey, document }) {
      restoreThemeFromLocalStorage();

      effect(() => {
        const _theme = theme();
        localStorage.setItem(themeKey, _theme);

        if (_theme === 'light') {
          document.getElementsByTagName('body')[0].classList.remove('dark');
        } else {
          document.getElementsByTagName('body')[0].classList.add('dark');
        }
      })
    }
  })
);
