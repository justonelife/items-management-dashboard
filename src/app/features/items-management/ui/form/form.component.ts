import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EditItem } from '@features/items-management/data-access';
import { CardComponent } from '@libs/card';
import { AppTypedForm } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { DynamicField, DynamicType, HysDynamicFormComponent } from '@libs/hys-controller';
import { Option } from '@libs/select';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    HysButtonComponent,
    HysDynamicFormComponent,
    RouterLink,
  ],
  selector: 'app-items-management-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsManagementForm {

  form = input.required<AppTypedForm<EditItem>>();
  categoryOptions = input.required<Option[]>();
  typeOptions = input.required<Option[]>();

  emitSubmit = output<void>();
  basicInformationFields = signal<DynamicField[]>([]);
  tagsFields = signal<DynamicField[]>([
    {
      key: 'tags',
      type: DynamicType.CHIPS_INPUT,
      withWrapper: false,
      inputs: { placeholder: 'Add a tag' },
      styleClass: 'col-span-12',
    },
  ]);
  statusAndVisibilityFields = signal<DynamicField[]>([
    {
      key: 'status',
      label: 'Status',
      type: DynamicType.SELECT,
      withWrapper: false,
      inputs: {
        options: [
          { label: 'Draft', value: 0 },
          { label: 'Active', value: 1 },
          { label: 'Archieve', value: 2 },
        ] as Option<number>[],
      },
      styleClass: 'col-span-12',
    },
  ]);

  constructor() {
    effect(() => {
      const _categoryOptions = this.categoryOptions();
      const _typeOptions = this.typeOptions();
      this.setUpBasicInformationFields(_categoryOptions, _typeOptions);
    });
  }

  submit() {
    this.emitSubmit.emit();
  }

  private setUpBasicInformationFields(categoryOptions: Option[], typeOptions: Option[]): void {
    this.basicInformationFields.set([
      {
        key: 'name',
        label: 'Name',
        type: DynamicType.INPUT,
        withWrapper: false,
        inputs: { placeholder: 'Name' },
      },
      {
        key: 'price',
        label: 'Price',
        type: DynamicType.INPUT,
        withWrapper: false,
        inputs: { placeholder: 'Price' },
      },
      {
        key: 'type',
        label: 'Type',
        type: DynamicType.SELECT,
        withWrapper: false,
        inputs: { options: typeOptions, placeholder: 'Select type' },
      },
      {
        key: 'category',
        label: 'Category',
        type: DynamicType.SELECT,
        withWrapper: false,
        inputs: { options: categoryOptions, placeholder: 'Select category' },
      },
      {
        key: 'description',
        label: 'Description',
        type: DynamicType.TEXTAREA,
        withWrapper: false,
        inputs: { placeholder: 'Enter product description' },
        styleClass: 'col-span-12',
      },
    ]);
  }

}
