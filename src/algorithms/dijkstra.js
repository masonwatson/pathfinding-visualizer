export function dijkstra(grid, startNode, finishNode) {

    const visitedNodesInOrder= [];
    startNode.distance = 0;

    const unvisitedNodes = getAllNodes(grid);

    // while there are still unvisited nodes
    while (!!unvisitedNodes.length) {

        // sort unvisited nodes based on theri distance
        sortNodesByDistance(unvisitedNodes);

        // shift removes the first element of the array
        const closestNode = unvisitedNodes.shift();

        if(closestNode.isWall) continue;

        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVistited = true;
        visitedNodesInOrder.push(closestNode);

        // at some point, we will reach where the closest node is the finish node
        if (closestNode === finishNode) return visitedNodesInOrder;

        // 
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {

    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for(const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {

    const neighbors = [];
    const {col, row} = node;

    // node above current node will be a neighbor
    if (row > 0) neighbors.push(grid[row - 1][col]);
    // node underneath the current node will be a neighbor
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    // node to the left of the current node will be a neighbor
    if (col > 0) neighbors.push(grid[row][col - 1]);
    // node to the right of the current node will be a neighbor
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter(neighbor => !neighbor.isVistited)
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}