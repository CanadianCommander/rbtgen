import Report from "@/lib/report/Report";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";
import Relation from "@/lib/report/databaseModel/Relation";
import ReportQueryService from "@/lib/report/ReportQueryService";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";

export default class ReportBuilderService
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
   * set root node of the report
   * @param newRoot - the new node to use as the root
   */
  public setRootNode(newRoot: ReportNode)
  {
    this._report.reportModel.rootNode = newRoot;
  }

  /**
   * add a new node to the report graph built of the given entity
   * @param relation - the entity to use as the base of the new node
   * @param from - the node which is to be the parent of the new node.
   * @return the new node that was added to the graph
   */
  public addNodeFromRelation(relation: Relation, from: ReportNode): ReportNode
  {
    const newNode = ReportNodeFactory.newReportNode(relation.to);
    this.addNode(newNode, from);
    newNode.parentRelation = relation;
    return newNode;
  }

  /**
   * add a node to the report graph
   * @param newNode - the node to add
   * @param from - the node which is to be the parent of the new node.
   */
  public addNode(newNode: ReportNode, from: ReportNode): void
  {
    from.pushChildNode(newNode);
  }

  /**
   * delete an output from a node
   * @param outputToDelete - the output to delete
   * @param nodeToDeleteFrom - the node to delete it from
   */
  public deleteOutputFromNode(outputToDelete: NodeOutput, nodeToDeleteFrom: ReportNode): void
  {
    nodeToDeleteFrom.removeNodeOutput(outputToDelete);
    this.pruneInvalidOutputs();
  }

  /**
   * delete a node from the report graph
   * @param nodeToDelete - the node to delete
   */
  public deleteNode(nodeToDelete: ReportNode): void
  {
    if (this._report.reportModel.rootNode === nodeToDelete)
    {
      this.setRootNode(null);
    }
    else
    {
      const reportQueryService = new ReportQueryService();
      const parentNode: ReportNode = reportQueryService.findNodeParent(nodeToDelete, this._report.reportModel.rootNode);
      parentNode.removeChildNode(nodeToDelete);
      this.pruneInvalidOutputs();
    }
  }

  /**
   * prune invalid / impossible outputs from the report. This can happen if the node
   * that an output is from has been removed from the report.
   */
  public pruneInvalidOutputs(): void
  {
    const reportQueryService = new ReportQueryService();
    reportQueryService.forEachReportNode(this._report.reportModel.rootNode, (node: ReportNode) =>
    {
      const invalidOutputs: NodeOutput[] = [];
      node.nodeOutputs.forEach((output) =>
      {
        let valid = false;
        node.possibleOutputFields.forEach((possibleOutput) =>
        {
          if (possibleOutput.field === output.field)
          {
            valid = true;
          }
        });

        if (!valid)
        {
          invalidOutputs.push(output);
        }
      });

      invalidOutputs.forEach((output) => node.removeNodeOutput(output));
    });
  }

  /**
   * remove all references to a node output from the report graph
   * @param nodeOutputToDelete - the node output to delete
   */
  public deleteNodeOutput(nodeOutputToDelete: NodeOutput): void
  {
    const reportQueryService = new ReportQueryService();
    reportQueryService.bfsReportNodes(this._report.reportModel.rootNode, (nodes: ReportNode[]) =>
    {
      nodes.forEach((node) => node.removeNodeOutput(nodeOutputToDelete));
    });
  }
}
