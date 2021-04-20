import UserDocument from "@/lib/user/model/UserDocument";
import Report from "@/lib/report/Report";
import {userApi} from "@/lib/api/Api";
import {UserDocumentTypes} from "@/lib/user/model/UserDocumentTypes";
import DatabaseModelFactory from "@/lib/report/databaseModel/DatabaseModelFactory";
import ReportModelFactory from "@/lib/report/reportModel/ReportModelFactory";

export default class ReportFactory
{

  public static readonly REPORT_V1_0_0 = "1.0.0";
  public static readonly REPORT_V2_0_0 = "2.0.0";
  public static readonly CURRENT_VERSION = ReportFactory.REPORT_V2_0_0

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

    return new Report(newReport, schemaDocument, this.CURRENT_VERSION, null, null);
  }

  /**
   * load the specified report document
   * @param reportDocumentId - the report document id
   * @return a newly constructed report object for the specified report.
   */
  public static async loadReport(reportDocumentId: string): Promise<Report>
  {
    const reportDocument: UserDocument = await userApi.getDocument(reportDocumentId, true);

    const jsonData = JSON.parse(atob(reportDocument.fileData));
    let schemaDocument = null;
    if (jsonData.version === this.REPORT_V1_0_0)
    {
      schemaDocument = (await userApi.getDocument(jsonData.schemaDocument, true));
    }
    else
    {
      console.log(jsonData.schemaDocument);
      schemaDocument = (await userApi.getDocuments(UserDocumentTypes.SCHEMA, jsonData.schemaDocument, true))[0];
    }
    const databaseModel = DatabaseModelFactory.buildModelFromSchemaDocument(schemaDocument);

    return new Report(
      reportDocument,
      schemaDocument,
      jsonData.version,
      databaseModel,
      ReportModelFactory.buildReportModelFromReportDocument(reportDocument, databaseModel));
  }

  /**
   * get report document bootstrap JSON string
   * @param schemaDocument - the schema document on which this report will be based
   * @return JSON bootstrap string
   */
  public static getReportDocumentBootstrap(schemaDocument: UserDocument): string
  {
    return `{ "version": "${ReportFactory.CURRENT_VERSION}", "report": null, "schemaDocument": "${schemaDocument.fileName}"}`;
  }
}
