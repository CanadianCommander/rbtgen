import Report from "@/lib/report/Report";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";
import Relation from "@/lib/report/databaseModel/Relation";

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
}
