import Report from "@/lib/report/Report";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import Entity from "@/lib/report/databaseModel/Entity";
import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";

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
   * @param entity - the entity to use as the base of the new node
   * @param to - the node which is to be the parent of the new node.
   */
  public addNodeFromEntity(entity: Entity, to: ReportNode): void
  {
    return this.addNode(ReportNodeFactory.newReportNode(entity), to);
  }

  /**
   * add a node to the report graph
   * @param newNode - the node to add
   * @param to - the node which is to be the parent of the new node.
   */
  public addNode(newNode: ReportNode, to: ReportNode): void
  {
    to.pushChildNode(newNode);
  }
}
