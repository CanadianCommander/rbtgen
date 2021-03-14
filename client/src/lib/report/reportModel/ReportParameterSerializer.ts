import ReportParameter from "@/lib/report/reportModel/ReportParameter";

export default class ReportParameterSerializer
{
  // ==========================================================
  // Public Class Methods
  // ==========================================================

  /**
   * convert a report parameter to a serialize hash
   * @param reportParam - the param to serialize
   */
  public static serializeHash(reportParam: ReportParameter): any
  {
    return {
      id: reportParam.id,
      type: reportParam.type,
      description: reportParam.description,
    };
  }
}
