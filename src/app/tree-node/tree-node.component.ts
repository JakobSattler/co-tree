import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  template: `
  <div>
    <span (click)="extend()"
    [class]="extended ? 'glyphicon glyphicon-menu-down' : 'glyphicon glyphicon-menu-right'"></span>
    </div>
  `,
  styles: []
})
export class TreeNodeComponent implements OnInit {

  extended: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  extend() {
    this.extended = !this.extended;
  }

}
