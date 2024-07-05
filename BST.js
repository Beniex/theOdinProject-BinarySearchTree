class Node {
    constructor(data, left,  right){
        this.data = data; 
        this.left = left; 
        this.right = right; 
    }
}

class Tree{
    constructor(array){
        this.array = this.deduplicateAndSort(array);  
        this.root = this.buildTree(this.array); 
    }

    buildTree(array){
        if(array.length>1){ 
            let middleOfArray = Math.floor(array.length / 2); 
            let subArrayLeft = array.slice(0, middleOfArray);
            let subArrayRight = array.slice(middleOfArray +1); 
            let root = new Node(array[middleOfArray], this.buildTree(subArrayLeft), this.buildTree(subArrayRight));  
            return root; 
        } else if (array.length === 1){
            return new Node(array[0], null, null); 
        }
        if (array.length === 0) {
            return null;
        }
    }

    deduplicateAndSort(array) {
        let uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
        return uniqueSortedArray;
    }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

var test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root); 

