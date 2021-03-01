import ReportModel from "@/lib/report/reportModel/ReportModel";
import ReportNodeSerializer from "@/lib/report/reportModel/ReportNodeSerializer";

export default class ReportModelSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize the reportModel as hash
   * @param reportModel - the reportModel to serialize
   * @return the serialize report as hash
   */
  public static serializeHash(reportModel: ReportModel): any
  {
    return {
      root: ReportNodeSerializer.serializeHash(reportModel.rootNode),
    };
  }
}
