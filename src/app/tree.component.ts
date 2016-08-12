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
  }

  onNodeSelected(selectedNode: TreeNode) {
    this.selectedNode = selectedNode;
    if (selectedNode.selected) {
      this.uncheckChildren(selectedNode);
      this.uncheckParents(this.rootNode);
    } else if (!selectedNode.selected) {
      this.checkChildren(selectedNode);
      this.checkParents(this.rootNode);
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

  checkParents(node: any) {
    if (node == null) {
      return;
    }
    let childSelected = false;
    for (let n of node.children) {
      this.checkParents(n);
      if (n == this.selectedNode) {
        childSelected = true;
      }
    }
    if (childSelected) {
      node.childSelected = true;
    }
  }

  uncheckParents(node: any) {
    if (node == null) {
      return;
    }
    let childSelected = true;
    for (let n of node.children) {
      this.uncheckParents(n);
      if (n == this.selectedNode) {
        childSelected = false;
      }
    }
    if (!childSelected) {
      node.childSelected = false;
    }
  }
}
