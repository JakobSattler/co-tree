import {Component, OnInit, Input} from '@angular/core';
import {TreeNode} from '../tree-node';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'tree-node.component.html',
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
