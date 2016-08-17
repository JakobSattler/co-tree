import {Component, OnInit, Input, Output, EventEmitter, forwardRef, Inject, ViewChild, ElementRef} from '@angular/core';
import {TreeNode} from '../tree-node';
import {TreeService} from '../tree.service';
import {TreeComponent} from '../tree.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  moduleId: module.id,
  selector: 'co-tree-node',
  templateUrl: 'tree-node.component.html',
  styleUrls: ['tree-node.component.css'],
  directives: [TreeNodeComponent, DropdownComponent],
  providers: [TreeService]
})
export class TreeNodeComponent implements OnInit {

  extended: boolean = false;
  paddingPerLevel: number = 10;

  @Input()
  level: number;

  @Input()
  node: TreeNode;

  @Input()
  classString: String = 'glyphicon glyphicon-folder-close';

  @Output()
  nodeSelected = new EventEmitter();

  @ViewChild('nodeDiv')
  nodeDiv: ElementRef;

  constructor(private treeService: TreeService, @Inject(forwardRef(() => TreeComponent)) private treeComponent: TreeComponent) {
  }

  ngOnInit() {
    this.node.level = this.level;
  }

  extend() {
    this.extended = !this.extended;

  }

  getPadding() {
    return this.paddingPerLevel * this.level + 10 + 'px';
  }

  onNodeSelected() {
    this.nodeSelected.emit(this.node);
  }

  onMouseEnter() {
    this.nodeDiv.nativeElement.style.backgroundColor = '#999999';
  }

  onMouseLeave() {
    this.nodeDiv.nativeElement.style.backgroundColor = 'white';
  }

  changePicWithMouse()
  {

    this.classString=prompt("Change Pic","change pic here");
  }


}
