import { Directive, input } from "@angular/core";
import { AppSeverity } from "../types";

@Directive({
  selector: '[lib-severity]',
  standalone: true,
  host: {
    '[class]': 'klass'
  }
})
export class SeverityDirective {
  readonly CLASS_MAPPER: Record<AppSeverity, string> = {
    'neutral': 'border text-foreground',
    'info': 'border-transparent bg-slate-200 dark:text-zinc-600 hover:bg-slate-100',
    'danger': 'text-red-500!',
    'primary': 'bg-black dark:bg-yellow-400 text-white dark:text-black',
    'secondary': 'bg-secondary',
  }

  severity = input<AppSeverity>('primary');

  get klass() {
    const severity = this.severity();
    if (severity) {
      return this.CLASS_MAPPER[severity];
    }
    return '';
  }
}
