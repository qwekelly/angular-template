import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-edit-indexdb-data',
  templateUrl: './modal-edit-indexdb-data.component.html',
  styleUrls: ['./modal-edit-indexdb-data.component.scss']
})
export class ModalEditIndexdbDataComponent implements OnInit {

  eduInfoForm: FormGroup;

  name?: string;

  age?: number;

  fraction?: number;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalEditIndexdbDataComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data?: any,
  ) {
    this.eduInfoForm = this.formBuilder.group({
      name: new FormControl(this.name, [Validators.required]),
      age: new FormControl(this.age),
      fraction: new FormControl(this.fraction),
    })
  }

  ngOnInit() {
  }

  handleSubmit() {
    this.dialogRef.close({...this.eduInfoForm.value});
  }
}
