import Report from "@/lib/report/Report";
import ReportNode from "@/lib/report/reportModel/ReportNode";

export default class ReportQueryService
{
  protected _report: Report;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(report: Report)
  {
    this._report = report;
  }

  /**
   * Get the reportNode tree as an array of arrays where each array represents a level down in the
   * tree's depth. For example a tree with three nodes
   *        / child1
   * root <
   *        \ child2
   * would return as [[root], [child1, child2]]
   * @return array of ReportNode arrays
   */
  public reportNodesAsBFSArrays(): (ReportNode[])[]
  {
    if (!this._report.reportModel.rootNode)
    {
      return [];
    }

    const result: (ReportNode[])[] = [];

    this.bfsReportNodes(this._report.reportModel.rootNode, (nodes) =>
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
