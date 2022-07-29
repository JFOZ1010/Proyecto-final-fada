function generateBST(array) {
    console.log(array)
    this.value = array[0];
    this.left = null;
    this.rigth = null;
    let i = 1;
    while (i < array.length) {
      this.insert(array[i]);
      i++;
    }
  }3
  
  generateBST.prototype.insert = function(value) {
    if (this.value > value) {
      if (!this.left) this.left = new generateBST([value]); // <- pasamos un arreglo
      else this.left.insert(value);
    } else if (this.value < value) {
      if (!this.rigth) this.rigth = new generateBST([value]); // <- pasamos un arreglo
      else this.rigth.insert(value);
    }
  }
  
  let tree = new generateBST([16,6,23,2,17,31,14,5]);
  console.log(JSON.stringify(tree, null, 2));