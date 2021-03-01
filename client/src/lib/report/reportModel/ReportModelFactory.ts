import UserDocument from "@/lib/user/model/UserDocument";
import ReportModel from "@/lib/report/reportModel/ReportModel";
import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";

export default class ReportModelFactory
{
  // ==========================================================
  // Public methods
  // ==========================================================

  /**
   * load a report model from the given report document
   * @param reportDocument - the report document to load the model from.
   * @param databaseModel - the database model for this report
   */
  public static buildReportModelFromReportDocument(reportDocument: UserDocument, databaseModel: DatabaseModel): ReportModel
  {
    const jsonData = JSON.parse(atob(reportDocument.fileData));

    if (jsonData.report)
    {
      return new ReportModel(ReportNodeFactory.buildReportNodeFromJson(jsonData.report.root, databaseModel));
    }
    else
    {
      return new ReportModel(null);
    }
  }

}
