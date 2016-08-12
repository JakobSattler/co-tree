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
        console.log(this.rootNode.children);
      }
    );
  }

  onNodeSelected(selectedNode: TreeNode) {
    this.checkChildren(selectedNode);
  }

  checkChildren(node: any) {
    if (node == null) {
      return;
    }
    console.log(node.name);
    node.selected = true;
    for (let n of node.children) {
      this.checkChildren(n);
    }

  }

}
