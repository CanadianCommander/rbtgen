import Entity from "@/lib/report/databaseModel/Entity";
import ReportNode from "@/lib/report/reportModel/ReportNode";

export default class ReportNodeFactory
{
  // ==========================================================
  // Public methods
  // ==========================================================

  /**
   * build a new report node
   * @param entity - node primary entity
   * @return - the new node 
   */
  public static newReportNode(entity: Entity): ReportNode
  {
    return new ReportNode(entity);
  }

}
