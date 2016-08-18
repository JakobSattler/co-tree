import {Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {TreeNodeComponent} from './tree-node/tree-node.component';
import {TreeService} from './tree.service';
import {TreeNode} from './tree-node';

@Component({
  moduleId: module.id,
  selector: 'co-root',
  templateUrl: 'tree.component.html',
  directives: [TreeNodeComponent],
  providers: [TreeService],
  styles: [`
    div {
      padding-left: 10px;
    }
  `]
})
export class TreeComponent implements OnInit {
  rootNode: TreeNode;

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.treeService.getNodes().subscribe(
      (data: TreeNode) => {
        this.rootNode = data;
        console.log(data);
      }
    );
  }

  onNodeSelected(selectedNode: TreeNode) {
    if (selectedNode.selected) {
      this.treeService.nodeUnselected(selectedNode, this.rootNode);
    } else if (!selectedNode.selected) {
      this.treeService.nodeSelected(selectedNode, this.rootNode);
    }
  }


}
