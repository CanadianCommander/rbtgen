import UserDocument from "@/lib/user/model/UserDocument";
import Report from "@/lib/report/Report";
import {userApi} from "@/lib/api/Api";
import {UserDocumentTypes} from "@/lib/user/model/UserDocumentTypes";

export default class ReportFactory
{

  public static NEW_REPORT_VERSION = "1.0.0";

  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * create a new report
   * @param reportName - the name of the new report.
   * @param schemaDocument - the schema file to use for the report.
   * @return the newly created report
   */
  public static async newReport(reportName: string, schemaDocument: UserDocument): Promise<Report>
  {
    const newReport = await userApi.addDocument({
      fileName: reportName,
      fileData: btoa(ReportFactory.getReportDocumentBootstrap(schemaDocument)),
      fileType: UserDocumentTypes.RBT,
    });

    return new Report(newReport, schemaDocument);
  }

  /**
   * get report document bootstrap JSON string
   * @param schemaDocument - the schema document on which this report will be based
   * @return JSON bootstrap string
   */
  public static getReportDocumentBootstrap(schemaDocument: UserDocument): string
  {
    return `{ "version": "${ReportFactory.NEW_REPORT_VERSION}", "report": null, "schemaDocument": "${schemaDocument.id}"}`;
  }

  // ==========================================================
  // Getters
  // ==========================================================
}
