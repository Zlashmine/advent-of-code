export class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }

  public isLeaf(): boolean {
    return !this.left && !this.right
  }
}
