import ReportModel from "@/lib/report/reportModel/ReportModel";
import ReportNodeSqlGenerator from "@/lib/report/sql/ReportNodeSqlGenerator";

export default class ReportModelSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given report model.
   * @param reportModel
   */
  public static generateSql(reportModel: ReportModel): string
  {
    return ReportNodeSqlGenerator.generateSql(reportModel.rootNode, true);
  }
}
