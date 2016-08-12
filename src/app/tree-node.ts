export class TreeNode {
  name: String;
  number: number;
  children: Array<TreeNode>;
  selected: boolean = true;

  constructor(name: String, number: number, children: Array<TreeNode>, selected: boolean) {
    this.selected = true;
  }

}
