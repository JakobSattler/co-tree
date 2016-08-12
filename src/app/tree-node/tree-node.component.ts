import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TreeNode} from '../tree-node';
import {TreeService} from '../tree.service';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'tree-node.component.html',
  styleUrls: ['tree-node.component.css'],
  directives: [TreeNodeComponent],
  providers: [TreeService]
})
export class TreeNodeComponent implements OnInit {

  extended: boolean = false;
  paddingPerLevel: number = 10;

  @Input()
  level: number;

  @Input()
  node: TreeNode;

  @Output()
  nodeSelected = new EventEmitter();

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    console.log('level: ' + this.level);
  }

  extend() {
    this.extended = !this.extended;
  }

  getPadding() {
    return this.paddingPerLevel * this.level + 'px';
  }

  onNodeSelected() {
    this.nodeSelected.emit(this.node);
  }
}
