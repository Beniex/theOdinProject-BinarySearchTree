class Node {
    constructor(data, left,  right){
        this.data = data; 
        this.left = left; 
        this.right = right; 
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
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
    
    insert(value){
        let root = this.root; 
        lookForLeaf(root); 
        function lookForLeaf(node){
            if(node.left == null && node.right == null){
                node.right = new Node(value, null, null); 
            } else {
                if (node.data < value) {
                    lookForLeaf(node.right); 
                } else if(node.data > value){
                    lookForLeaf(node.left); 
                }
            }
        }   
    }

    deleteItem(value) {
        this.root = deleteRec(this.root, value);

        function deleteRec(node, value) {
            if (node === null) {
                return null;
            }

            if (value < node.data) {
                node.left = deleteRec(node.left, value);
            } else if (value > node.data) {
                node.right = deleteRec(node.right, value);
            } else {
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }

                node.data = findMin(node.right).data;
                node.right = deleteRec(node.right, node.data);
            }
            return node;
        }

        function findMin(node) {
            while (node.left !== null) {
                node = node.left;
            }
            return node;
        }
    }

    find(value) {
        return search(this.root);

        function search(node) {
            if (node === null) {
                return null;
            }
            if (node.data === value) {
                return node;
            } else if (node.data < value) {
                return search(node.right);
            } else {
                return search(node.left);
            }
        }
    }

    levelOrder(callback) {
        let root = this.root;
        if (!root) return;
    
        let Q = [];
        Q.push(root);
    
        while (Q.length > 0) {
            let node = Q.shift();
            callback(node.data);
    
            if (node.left !== null) {
                Q.push(node.left);
            }
            if (node.right !== null) {
                Q.push(node.right);
            }
        }
    }

    inOrder(callback) {
        function inOrderRec(node) {
            if (node === null) return;

            inOrderRec(node.left);
            callback(node.data);
            inOrderRec(node.right);
        }

        inOrderRec(this.root);
    }

    
    preOrder(callback){
        
        function PreOrderRec(node) {
            if (node === null) return;

            callback(node.data);
            PreOrderRec(node.left);
            PreOrderRec(node.right);
        }

        PreOrderRec(this.root);  
    }    

    postOrder(callback){

        function PostOrderRec(node){
            if(node === null) return; 

            PostOrderRec(node.left);
            PostOrderRec(node.right);
            callback(node.data);
        }
        PostOrderRec(this.root); 
    }

    height(node) {
        if (node === null) {
            return -1; // Retourne -1 pour indiquer que ce n'est pas un nœud valide
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) {
                return 0;
            }
            let leftHeight = checkBalance(node.left);
            if (leftHeight === -1) return -1;
            let rightHeight = checkBalance(node.right);
            if (rightHeight === -1) return -1;

            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }
            return 1 + Math.max(leftHeight, rightHeight);
        }

        return checkBalance(this.root) !== -1;
    }

    rebalance(){
        let arrayBalanced =[]; 
        this.inOrder((nodeValue)=>{arrayBalanced.push(nodeValue)})
        this.arrayBalanced = this.deduplicateAndSort(arrayBalanced); 
        this.root = this.buildTree(arrayBalanced); 
    }

    depth(node) {
        let value = node.data;
    
        function search(currentNode, currentDepth) {
            if (currentNode === null) {
                return -1; // Retourne -1 pour indiquer que le nœud n'a pas été trouvé
            }
            if (currentNode.data === value) {
                return currentDepth;
            } else if (currentNode.data < value) {
                return search(currentNode.right, currentDepth + 1);
            } else {
                return search(currentNode.left, currentDepth + 1);
            }
        }
        return search(this.root, 0);
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



const PrintThis = (message) => {
    console.log('node data is : ' + message); 
}

const createRandomArray = (size, max) => {
    let array = []; 
    for(let i =0; i<size; i++){
        array.push(Math.floor(Math.random() * max))
    }
    return array; 
}



var test = new Tree(createRandomArray(9, 100));

console.log('levelOrder'); 
test.levelOrder((message)=>console.log(message));
console.log('inOrder'); 
test.inOrder((message)=>console.log(message));
console.log('preOrder');
test.preOrder((value) => console.log(value)); 
console.log('postOrder');
test.postOrder((value) => console.log(value));

console.log('the tree is balanced ? : ') ; 
console.log(test.isBalanced()); 
console.log('lets add a few numbers! ') ; 
test.insert(234); 
test.insert(432); 
test.insert(940);
console.log('the tree is balanced ? : ') ; 
console.log(test.isBalanced()); 
console.log('lets rebalance it!') ; 
test.rebalance(); 
console.log('the tree is balanced now ? : ') ; 
console.log(test.isBalanced());

console.log('levelOrder'); 
test.levelOrder((message)=>console.log(message));
console.log('inOrder'); 
test.inOrder((message)=>console.log(message));
console.log('preOrder');
test.preOrder((value) => console.log(value)); 
console.log('postOrder');
test.postOrder((value) => console.log(value));
