import {Component, OnInit, Input, Output, EventEmitter, forwardRef, Inject} from '@angular/core';
import {TreeNode} from '../tree-node';
import {TreeService} from '../tree.service';
import {TreeComponent} from '../tree.component';

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

  constructor(private treeService: TreeService, @Inject(forwardRef(() => TreeComponent)) private treeComponent: TreeComponent) {
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
