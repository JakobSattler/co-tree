import {Component, OnInit, Input, Output, EventEmitter, forwardRef, Inject, ViewChild, ElementRef} from '@angular/core';
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

  @Input()
  classString: String = 'glyphicon glyphicon-folder-close';

  @Output()
  nodeSelected = new EventEmitter();

  @ViewChild('nodeText')
  nodeText: ElementRef;

  constructor(private treeService: TreeService, @Inject(forwardRef(() => TreeComponent)) private treeComponent: TreeComponent) {
  }

  ngOnInit() {
    this.node.level = this.level;
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

  changePicWithMouse() {
    this.classString = prompt("Change Pic", "change pic here");
  }

  editNode() {
    this.nodeText.nativeElement.focus();
  }

  onKeyDown(event) {
    console.log(event.keyCode);

    //handle text change if source of event is nodeText-element
    if (event.srcElement == this.nodeText.nativeElement) {
      if (event.keyCode == 13) {
        this.saveNodeChange();
      } else if (event.keyCode >= 64 && event.keyCode <= 90) {
        this.node.name += String.fromCharCode(event.keyCode);
      }
    }
  }

  saveNodeChange() {
    this.nodeText.nativeElement.blur();
    console.log('save!');
  }

  discardNodeChange() {
    console.log('discard');
  }

}
