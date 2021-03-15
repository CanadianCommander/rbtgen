import {ReportParameterType} from "@/lib/report/reportModel/ReportParameterType";
import ParamQuery from "@/lib/report/databaseModel/ParamQuery";

export default class ReportParameter
{
  protected _id: string;
  protected _type: ReportParameterType;
  protected _description: string;
  protected _query: ParamQuery;

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(id: string, type: ReportParameterType, description = "", query: ParamQuery = null)
  {
    this._id = id;
    this._type = type;
    this._description = description;
    this._query = query;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get id(): string
  {
    return this._id;
  }

  get type(): ReportParameterType
  {
    return this._type;
  }

  get description(): string
  {
    return this._description;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set id(id: string)
  {
    this._id = id.replace(" ", "_");
  }

  set type(type: ReportParameterType)
  {
    this._type = type;
  }

  set description(description: string)
  {
    this._description = description;
  }
}
