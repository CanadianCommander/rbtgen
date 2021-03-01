import Report from "@/lib/report/Report";
import ReportModelSerializer from "@/lib/report/reportModel/ReportModelSerializer";
import UserDocument from "@/lib/user/model/UserDocument";
import {UserDocumentTypes} from "@/lib/user/model/UserDocumentTypes";

export default class ReportSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize the report as json
   * @param report - the report to serialize
   * @return the serialize report as JSON
   */
  public static serializeJson(report: Report): string
  {
    return JSON.stringify({
      version: report.version,
      report: ReportModelSerializer.serializeHash(report.reportModel),
      schemaDocument: report.schemaDocumentId,
    });
  }

  /**
   * serialize the report in to a user document suitable for resubmission back to the server
   * @param report - the report to serialize
   * @return the report formatted as a user document
   */
  public static serializeUserDoc(report: Report): UserDocument
  {
    const userDoc: UserDocument = new UserDocument();
    userDoc.fileName = report.name;
    userDoc.fileType = UserDocumentTypes.RBT;
    userDoc.id = report.reportDocumentId;
    userDoc.fileData = btoa(this.serializeJson(report));
    return userDoc;
  }

}
