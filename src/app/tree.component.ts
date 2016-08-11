import {Component} from '@angular/core';
import {TreeNodeComponent} from './tree-node/tree-node.component';
import {TreeService} from './tree.service';

@Component({
  moduleId: module.id,
  selector: 'co-root',
  template: `
  <h1>Tree component</h1>
  <co-tree-node></co-tree-node>
  <div *ngIf="data">
  <div *ngFor="let n of data.children">
    <label>{{n.name}}</label>
  </div>
  </div>
  `,
  directives: [TreeNodeComponent],
  providers: [TreeService]
})
export class TreeComponent {
  data;

  constructor(private treeService: TreeService) {
    treeService.getNodes().subscribe(
      (data: any) => {
        console.log(data);
        this.data = data;
      }
    );
  }
}
