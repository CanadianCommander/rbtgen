import UserDocument from "@/lib/user/model/UserDocument";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";

export default class Report
{
  protected _reportDocument: UserDocument = null;
  protected _schemaDocument: UserDocument = null;
  protected _version = "1.0.0";
  protected _databaseModel: any = null;
  protected _reportModel: any = null;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(
    reportDocument: UserDocument,
    schemaDocument: UserDocument,
    version: string,
    databaseModel: DatabaseModel,
    reportModel: any)
  {
    this._reportDocument = reportDocument;
    this._schemaDocument = schemaDocument;
    this._version = version;
    this._databaseModel = databaseModel;
    this._reportModel = reportModel;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get name(): string
  {
    return this._reportDocument.fileName;
  }

  get version(): string
  {
    return this._version;
  }

  get databaseModel(): DatabaseModel
  {
    return this._databaseModel;
  }

  get reportDocumentId(): string
  {
    return this._reportDocument.id;
  }

  get schemaDocumentId(): string
  {
    return this._schemaDocument.id;
  }

}
