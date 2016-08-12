import {Component, OnInit, Input} from '@angular/core';
import {TreeNode} from '../tree-node';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'tree-node.component.html',
  styleUrls: ['tree-node.component.css'],
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
  }

  getRange(number: number) {
    let a = [];
    for (let i = 0; i < number; i++) {
      a.push(i);
    }
    return a;
  }

  getPadding() {
    return 10 * this.level + 'px';
  }
}
