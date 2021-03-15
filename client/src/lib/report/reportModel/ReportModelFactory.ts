import UserDocument from "@/lib/user/model/UserDocument";
import ReportModel from "@/lib/report/reportModel/ReportModel";
import ReportNodeFactory from "@/lib/report/reportModel/ReportNodeFactory";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import ReportParameterFactory from "@/lib/report/reportModel/ReportParameterFactory";
import ReportParameter from "@/lib/report/reportModel/ReportParameter";

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
      let params: ReportParameter[] = [];
      if (jsonData.report.parameters)
      {
        params = jsonData.report.parameters.map((paramJson: any) => ReportParameterFactory.buildReportParameterFromJson(paramJson));
      }

      return new ReportModel(
        ReportNodeFactory.buildReportNodeFromJson(jsonData.report.root, databaseModel, null, params),
        params);
    }
    else
    {
      return new ReportModel(null, []);
    }
  }

}
