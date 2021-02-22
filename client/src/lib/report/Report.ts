import UserDocument from "@/lib/user/model/UserDocument";

export default class Report
{
  protected reportDocument: UserDocument = null;
  protected schemaDocument: UserDocument = null;
  protected version = "1.0.0";
  protected reportStructure: any = null;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(reportDocument: UserDocument, schemaDocument: UserDocument)
  {
    this.reportDocument = reportDocument;
    this.schemaDocument = schemaDocument;

    // TODO load report version & structure from file.
  }

}
