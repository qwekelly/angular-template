import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

class MockData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-angular-selection-model',
  templateUrl: './angular-selection-model.component.html',
  styleUrls: ['./angular-selection-model.component.scss'],
})
export class AngularSelectionModelComponent implements OnInit {

  multiple = false;

  allSelected = false;

  data: MockData[] = [];

  checkSelection = new SelectionModel(false);

  constructor() { }

  ngOnInit() {
    this.data = (new Array(10)).fill(1, 0, 10).map((item, index) => {
      return {
        id: index + 1,
        name: `check-item-${index + 1}`,
      };
    });
  }

  onAllSelectedChange() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.checkSelection.select(...this.data);
    } else {
      this.checkSelection.clear();
    }
  }

  onMultipleChange() {
    this.multiple = !this.multiple;
    this.checkSelection = new SelectionModel(this.multiple);
  }
}
