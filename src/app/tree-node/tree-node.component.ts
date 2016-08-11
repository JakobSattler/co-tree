import {Component, OnInit, Input} from '@angular/core';
import {TreeNode} from '../tree-node';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  template: `
  <div *ngIf="node">
    <span *ngFor="let i of range(level)">&nbsp;&nbsp;</span>
    <span (click)="extend()"
    [class]="extended ? 'glyphicon glyphicon-menu-down' : 'glyphicon glyphicon-menu-right'"></span>{{node.name}}
   </div>
   <template [ngIf]="node.children">
    <co-tree-node *ngFor="let child of node.children" [node]="child" [level]="level + 1"></co-tree-node>
   </template>
  `,
  styles: [],
  directives: [TreeNodeComponent]
})
export class TreeNodeComponent implements OnInit {

  extended: boolean = false;

  @Input()
  level: number;

  @Input()
  node: TreeNode;

  constructor() {
  }

  ngOnInit() {
    console.log('level: ' + this.level);
  }

  extend() {
    this.extended = !this.extended;
    console.log(this.node.children);
  }

  range() {
    let a = [];
    for (let i = 0; i < this.level; i++){
      a.push(i);
    }
    return a;
  }

}
