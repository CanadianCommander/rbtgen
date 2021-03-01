import ReportNode from "@/lib/report/reportModel/ReportNode";

export default class ReportQueryService
{
  // ==========================================================
  // Public methods
  // ==========================================================

  /**
   * find the closest report node (in terms of depth) by entity name.
   * @param name - the entity name to search for
   * @param startNode - the node at which to start the search
   */
  public getClosestNodeByName(name: string, startNode: ReportNode): ReportNode
  {
    const bfsArray = this.reportNodesAsBFSArrays(startNode);

    for (const nodeArray of bfsArray)
    {
      for (const node of nodeArray)
      {
        if (node.entity.name === name)
        {
          return node;
        }
      }
    }

    return null;
  }

  /**
   * Get the reportNode tree as an array of arrays where each array represents a level down in the
   * tree's depth. For example a tree with three nodes
   *        / child1
   * root <
   *        \ child2
   * would return as [[root], [child1, child2]]
   * @parma startNode - the start report node to get the bfs array for
   * @return array of ReportNode arrays
   */
  public reportNodesAsBFSArrays(startNode: ReportNode): (ReportNode[])[]
  {
    if (!startNode)
    {
      return [];
    }

    const result: (ReportNode[])[] = [];

    this.bfsReportNodes(startNode, (nodes) =>
    {
      result.push(nodes);
    });

    return result;
  }

  /**
   * traverse the report node tree starting at startNode calling callback to process each bfs level.
   * @param startNode - the node to start the bfs at
   * @param callback - a callback that will be called for every depth level of the tree with the nodes from that level
   */
  public bfsReportNodes(startNode: ReportNode, callback: (nodes: ReportNode[]) => void): void
  {
    let nodes: ReportNode[] = [];
    let currentNodes: ReportNode[] = [startNode];

    // yield root node
    callback(currentNodes);

    while (true)
    {
      nodes = currentNodes.map((node) => node.childNodes).flat();
      callback(nodes);
      currentNodes = nodes;

      if (nodes.length === 0)
      {
        break;
      }
    }
  }
}
