import Report from "@/lib/report/Report";
import ReportModelSqlGenerator from "@/lib/report/sql/ReportModelSqlGenerator";

export default class ReportSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given report.
   * @param report
   */
  public static generateSql(report: Report): string
  {
    return ReportModelSqlGenerator.generateSql(report.reportModel);
  }
}
