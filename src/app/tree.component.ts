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

  constructor(private treeService: TreeService) {
  }

  ngOnInit() {
    this.treeService.getNodes().subscribe(
      (data: any) => {
        this.rootNode = data;
      }
    );
  }

  onNodeSelected(selectedNode: TreeNode) {
    if (selectedNode.selected) {
      console.log("uncheck");
      this.uncheckChildren(selectedNode);
    } else if (!selectedNode.selected) {
      console.log("check");
      this.checkChildren(selectedNode);
    }
  }

  checkChildren(node: any) {
    if (node == null) {
      return;
    }
    node.selected = true;
    for (let n of node.children) {
      this.checkChildren(n);
    }
  }

  uncheckChildren(node: any) {
    if (node == null) {
      return;
    }
    node.selected = false;
    for (let n of node.children) {
      this.uncheckChildren(n);
    }
  }

}
