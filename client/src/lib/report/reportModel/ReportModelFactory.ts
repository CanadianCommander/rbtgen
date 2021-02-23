import UserDocument from "@/lib/user/model/UserDocument";
import ReportModel from "@/lib/report/reportModel/ReportModel";

export default class ReportModelFactory
{
  // ==========================================================
  // Public methods
  // ==========================================================

  /**
   * load a report model from the given report document
   * @param reportDocument - the report document to load the model from.
   */
  public static buildReportModelFromReportDocument(reportDocument: UserDocument): ReportModel
  {
    const jsonData = JSON.parse(atob(reportDocument.fileData));

    if (jsonData.report)
    {
      // TODO this
      console.log("TODO");
    }
    else
    {
      return new ReportModel(null);
    }
  }

}
