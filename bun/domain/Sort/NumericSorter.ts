export class NumericSorter {
  public static sort(arr: number[]): number[] {
    if (arr.length <= 10) {
      return this.insertionSort(arr)
    }
    return this.quickSort(arr, 0, arr.length - 1)
  }

  private static quickSort(arr: number[], low: number, high: number): number[] {
    if (low < high) {
      const pivotIndex = this.partition(arr, low, high)
      this.quickSort(arr, low, pivotIndex - 1)
      this.quickSort(arr, pivotIndex + 1, high)
    }
    return arr
  }

  private static partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high]!
    let i = low - 1

    for (let j = low; j < high; j++) {
      if (arr[j]! < pivot) {
        i++
        this.swap(arr, i, j)
      }
    }
    this.swap(arr, i + 1, high)
    return i + 1
  }

  private static insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i]!
      let j = i - 1

      while (j >= 0 && arr[j]! > key) {
        arr[j + 1] = arr[j]!
        j--
      }
      arr[j + 1] = key
    }
    return arr
  }

  private static swap(arr: number[], i: number, j: number): void {
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]!
  }
}
