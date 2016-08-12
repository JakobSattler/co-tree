export class TreeNode {
  name: String;
  number: number;
  children: Array<TreeNode>;
  selected: boolean;
  childSelected: boolean;

  constructor(name: String, number: number, children: Array<TreeNode>, selected: boolean) {
  }

}
