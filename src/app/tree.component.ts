import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
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
  selectedNode: TreeNode;

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.treeService.getNodes().subscribe(
      (data: any) => {
        this.rootNode = data;
      }
    );

    console.log(this.rootNode);
  }

  onNodeSelected(selectedNode: TreeNode) {
    console.log(this.treeService.rootNode);
    this.selectedNode = selectedNode;
    if (selectedNode.selected) {
      this.treeService.uncheckChildren(selectedNode);
      this.treeService.uncheckParents(this.rootNode);
    } else if (!selectedNode.selected) {
      this.treeService.checkChildren(selectedNode);
      this.treeService.checkParents(this.rootNode);
    }
  }
}
