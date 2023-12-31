

const containerDiv = document.getElementById('container')
const treeContainer = document.getElementById('treeContainer')
const inputDiv = document.getElementById('inputDiv')
const infoContainer = document.getElementById('infoContainer')

const getRandomNumbers = (numberOfNumbers) => {

   let randomArray = []

    for (let i = 0; i < numberOfNumbers; i++) {
        let number = Math.floor(Math.random() * 100)
        randomArray.push(number)
    }

    return randomArray      
}

function mergeSort(arr) {
   
    if (arr.length <= 1) {
        return arr
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid)
    const rightArr = arr.slice(mid)

    const sortedLeft = mergeSort(leftArr)
    const sortedRight = mergeSort(rightArr)

    return merge(sortedLeft, sortedRight)
}

function merge(left, right) {
    let mergedArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            mergedArr.push(left[leftIndex]);
            leftIndex++;
        } else if (right[rightIndex] < left[leftIndex]) {
            mergedArr.push(right[rightIndex]);
            rightIndex++;
        } else {
            // If both elements are equal, push one of them (avoid duplicates)
            mergedArr.push(left[leftIndex]);
            leftIndex++;
            rightIndex++;
        }
    }

    // Add remaining elements from both arrays
    while (leftIndex < left.length) {
        mergedArr.push(left[leftIndex]);
        leftIndex++;
    }

    while (rightIndex < right.length) {
        mergedArr.push(right[rightIndex]);
        rightIndex++;
    }

    return mergedArr;
}



class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array)    
    }
    sortArray(array) {

        return mergeSort(array)    
    }
    getSortedArrayLength(array) {

        let sortedArray = mergeSort(array)
        return  sortedArray.length
    } 

    buildTree(nodes) {
        if (!nodes.length) return null

        const mid = Math.floor(nodes.length / 2)
        const root = new Node(nodes[mid])

        root.left = this.buildTree(nodes.slice(0, mid));
        root.right = this.buildTree(nodes.slice(mid + 1))

        return root
    }
    
    insert(data) {
        
        const node = this.root
        if (node === null) {
            this.root = new Node(data)
            return
        } else {
            const searchTree = (node) => {

                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data)
                        this.size++
                        return
                    } else searchTree(node.left)
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data)
                        return
                    } else searchTree(node.right)
                }
            }
            searchTree(node)
        }
    }
    remove(data) {
        
        this.root = this.removeNode(this.root, data)
      
    }
    removeNode(root, data) {

        if (root === null) return
        
        if (data < root.data)  {
            root.left = this.removeNode(root.left, data)
            return root
        } else if (data > root.data) {
            root.right = this.removeNode(root.right, data)
            return root
        } else {
            //node with no children
            if (root.left === null) return root.right
            else if (root.right === null) return root.left

            //node with 2 children
            let succParent = root
            let succ = root.right

            while (succ.left !== null) {
                succParent = succ
                succ = succ.left
            }

            //update connection from succParent to succ.right
            if (succParent !== root) succParent.left = succ.right
            else succParent.right = succ.right

            root.data = succ.data
            
            return root
        }
    }
    find(data) {

        const searchTree = (node) => {
            
            if (node === null) return null
            if (data === node.data) return node
            else if (data < node.data) return searchTree(node.left)
            else return searchTree(node.right)
        }
        
        return searchTree(this.root)
    }
    levelOrderTraversal() {

        if (this.root == null) return null

        let queue = []
        let result = []

        queue.push(this.root)

        while (queue.length > 0) {
            let node = queue.shift()

            result.push(node.data)

            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }

        return result   
    }
    inOrder() {

        if (this.root == null) return null
        
        const result = []
        const inOrderTraverse = (node) => {
            node.left && inOrderTraverse(node.left)
            result.push(node.data)
            node.right && inOrderTraverse(node.right)
        }

        inOrderTraverse(this.root)
        return result

    }    
    preOrder() {

        if (this.root == null) return null

        const result = []
        const preOrderTraverse = (node) => {
            result.push(node.data)
            node.left && preOrderTraverse(node.left)
            node.right && preOrderTraverse(node.right)
        }

        preOrderTraverse(this.root)
        return result

    }
    postOrder() {

        if (this.root === null) return null

        const result = []
        const postOrderTraverse = (node) => {
            result.push(node.data)
            node.right && postOrderTraverse(node.right)
            node.left && postOrderTraverse(node.left)
        }

        postOrderTraverse(this.root)
        return result

    }
    getHeight(node) {

        if (node === null) return -1

        let left = this.getHeight(node.left)
        let right = this.getHeight(node.right)

        if (left > right) return left + 1
        else return right + 1

    }
    getDepth(node) {

        if (node === null) return 0

        let left = this.getDepth(node.left)
        let right = this.getDepth(node.right)

        if (left < right) return left + 1
        else return right + 1

    }
    isBalanced() {

       return (this.getDepth(this.root) >= this.getHeight(this.root) - 1)

    }
    balanceTree() {

        if (this.isBalanced()) return
        let nodes =  this.inOrder()
        this.root = this.buildTree(nodes)
        
    }    
    htmlPrint(node = this.root,  prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
    
        if (node.right !== null) {
            this.htmlPrint(node.right,  `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
    
        const newNode = document.createElement("div");
        newNode.classList.add('node')
        newNode.id = node.data
        newNode.textContent = `${prefix}${isLeft ? "  └── " : "  ┌── "}${node.data}`;
        treeContainer.appendChild(newNode);
    
        if (node.left !== null) {
            this.htmlPrint(node.left,  `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
       
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
        }
    }
}


const nameArray = ['alex', 'bob', 'cindy', 'dave', 'ed', 'frank', 'gina', 'helen', 'ira', 'john', 'karen', 'loyd', 'mary', 'ned', 'opal', 'piper', 'quinton', 'rachel', 'sally', 'tom', 'unis', 'vicki', 'wendel', 'xavier', 'yanni', 'zoe' ]
const unsortedNames = ['zoe', 'alex', 'xavier', 'bob', 'wendel','cindy', 'vicki','dave','unis','ed','tom', 'frank', 'gina', 'helen', 'yanni', 'ira', 'john', 'karen', 'loyd', 'mary', 'ned', 'opal', 'piper', 'quinton', 'rachel', 'sally']


const sortedNames = mergeSort(unsortedNames)


const nameTree = new Tree(sortedNames)
nameTree.buildTree(sortedNames)

// console.log(sortedArray)


// console.log(myTree)
// console.log(randomArray)
// console.log(myTree.sortArray(randomArray))
// console.log(myTree.getSortedArrayLength(randomArray))


// Test the function
// myTree.buildTreeRecursive(randomArray)
// const root = myTree.insert(myTree.returnData(sortedArray))
// // const insert = myTree.insert(99)
// const print = myTree.prettyPrint(root)

// console.log(root); // Print the value of the level-0 root node
// console.log(myTree.returnData(randomArray))

// myTree.htmlPrint(myTree.root)
// nameTree.htmlPrint()
// nameTree.prettyPrint()

// myTree.htmlPrint()
// myTree.prettyPrint()

async function showTree() {

    const randomArray = getRandomNumbers(50)
    const moreNums = getRandomNumbers(10)
    const sortedArray = mergeSort(randomArray)
    const myTree = new Tree(sortedArray)
    myTree.buildTree(sortedArray)
    myTree.prettyPrint()
    myTree.htmlPrint()
    console.log(`Tree balanced: ${myTree.isBalanced()}`)
    console.log( `Level Order Traversal: ${myTree.levelOrderTraversal()}`)
    for (let i = 0; i < moreNums.length; i++) {
        console.log( `Inserted: ${moreNums[i]}`)
        myTree.insert(moreNums[i])    
    }    
    console.log( `Tree balanced: ${myTree.isBalanced()}`)
    myTree.balanceTree()
    myTree.prettyPrint()
    myTree.htmlPrint()  
    console.log( `Tree balanced: ${myTree.isBalanced()}`)
    console.log(`Level Order Traversal: ${myTree.levelOrderTraversal()}`)
    console.log(`Pre Order Traversal: ${myTree.preOrder()}`)
    console.log(`Post Order Traversal: ${myTree.postOrder()}`)
    
}

// showTree()

const printTree = (tree) => {
    tree.prettyPrint()
    treeContainer.innerHTML = ''
    tree.htmlPrint()
}

let myTree = null



const renderInputs = () => {

  
    let randomArray = getRandomNumbers(25) 
    let sortedArray = mergeSort(randomArray)

    const createTreeBtn = document.createElement('button')
    createTreeBtn.textContent = 'Create Tree'
    const levelOrderElem = document.createElement('p')
    const inOrderArray = document.createElement('p')
    const preOrderArray = document.createElement('p')
    const postOrderArray = document.createElement('p')
    const treeHeight = document.createElement('p')
    const treeDepth = document.createElement('p')

    const setInfo = () => {
        inOrderArray.textContent = `In Order: ${myTree.inOrder()}`
        levelOrderElem.textContent = `Level Order: ${myTree.levelOrderTraversal()}`
        preOrderArray.textContent = `Pre Order: ${myTree.preOrder()}`
        postOrderArray.textContent = `Post Order: ${myTree.postOrder()}`
        treeHeight.textContent = `Height: ${myTree.getHeight(myTree.root)}`
        treeDepth.textContent = `Depth: ${myTree.getDepth(myTree.root)}`
    }

    createTreeBtn.addEventListener('click', () => {      
     
            myTree = new Tree(sortedArray)
            myTree.buildTree(sortedArray)
            setInfo()

            printTree(myTree)
        
    })
    inputDiv.appendChild(createTreeBtn)
    infoContainer.appendChild(levelOrderElem)
    infoContainer.appendChild(inOrderArray)
    infoContainer.appendChild(preOrderArray)
    infoContainer.appendChild(postOrderArray)
    infoContainer.appendChild(treeHeight)
    infoContainer.appendChild(treeDepth)


    const insertDiv = document.createElement('div')
    const insertInput = document.createElement('input')
    const insertBtn = document.createElement('button')
    insertBtn.textContent = 'Insert node'
    insertBtn.addEventListener('click', () => {
        if (insertInput.value === null) return
        else {
            if (!myTree) {
                myTree = new Tree(sortedArray)
            } else {
                myTree.insert(insertInput.value) 
                setInfo()           
            }
            insertInput.value = ''
            printTree(myTree)
        } 
    })
    inputDiv.appendChild(insertDiv)
    insertDiv.appendChild(insertBtn)
    insertDiv.appendChild(insertInput)
       
    const nodeElements = document.querySelectorAll('.node')
    const removeDiv = document.createElement('div')
    const removeItemBtn = document.createElement('button')
    const removeItemInput = document.createElement('input')    
    removeItemBtn.textContent = 'Remove node'
    removeItemBtn.addEventListener('click', () => {
        myTree.remove(removeItemInput.value)
        setInfo()
        removeItemInput.value = ''
        printTree(myTree)    

    })
    inputDiv.appendChild(removeDiv)  
    removeDiv.appendChild(removeItemBtn)
    removeDiv.appendChild(removeItemInput)

    const findDiv = document.createElement('div')
    const findDataInput = document.createElement('input')
    const findDataBtn = document.createElement('button')
    findDataBtn.textContent = 'Find node'
    
    findDataBtn.addEventListener('click', () => {
    
    for (const node of nodeElements) {
        if (node.classList.contains('blue')) {
            node.classList.remove('blue')
        }
    }

    if (findDataInput.value === '') return

    const result = myTree.find(parseInt(findDataInput.value, 10))
    if (result) {
    console.log(`Found: ${result.data}`)
    const foundElement = document.getElementById(result.data.toString())
    if (foundElement) {
      foundElement.classList.add('blue')
    }
    } else {
        console.log(`Data not found in the tree.`)  
        nodeElements.forEach((element) => {
            element.classList.add('red')
        })
        setTimeout(() => {
            nodeElements.forEach((element) => {
                element.classList.remove('red')
            })
        }, 200)
   
    }

  findDataInput.value = ''
  return
})

inputDiv.appendChild(findDiv);
findDiv.appendChild(findDataBtn);
findDiv.appendChild(findDataInput);

    

    const rebalanceTreeBtn = document.createElement('button')
    rebalanceTreeBtn.textContent = 'Balance Tree'
    rebalanceTreeBtn.addEventListener('click', () => {
        myTree.balanceTree()
        setInfo()
        printTree(myTree)
    })
    inputDiv.appendChild(rebalanceTreeBtn)
    
}

renderInputs()

const getNodeElements = () => {
    let nodesEl = document.querySelectorAll('.node')
    for (let i = 0; i < nodesEl.length; i++) {
     console.log(nodesEl[i].textContent)
    }
     
}

