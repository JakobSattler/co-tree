import {Component, OnInit,Output, EventEmitter} from '@angular/core';
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
  @Output()
  nodePicSelected = new EventEmitter();


  nodes: Array<TreeNode> = [];
  selectedNode: TreeNode;

  constructor(private treeService: TreeService) {
  }



  ngOnInit() {
    this.treeService.getNodes().subscribe(
      (data: any) => {
        this.nodes.push(data);
      }
    );
  }

  onNodeSelected(selectedNode: TreeNode) {
    if (selectedNode.selected) {
      this.treeService.nodeUnselected(selectedNode, this.nodes[0]);
      //this.treeService.uncheckChildren(selectedNode);
      //this.treeService.uncheckParents(this.rootNode);
    } else if (!selectedNode.selected) {
      this.treeService.nodeSelected(selectedNode, this.nodes[0]);
      //this.treeService.checkChildren(selectedNode);
      //this.treeService.checkParents(this.rootNode);
    }
  }


}
