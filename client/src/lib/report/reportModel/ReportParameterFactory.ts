import {ReportParameterType} from "@/lib/report/reportModel/ReportParameterType";
import ParamQuery from "@/lib/report/databaseModel/ParamQuery";
import ReportParameter from "@/lib/report/reportModel/ReportParameter";

export default class ReportParameterFactory
{
  // ==========================================================
  // Public Class Methods
  // ==========================================================

  /**
   * build a new report parameter
   * @param id - the id of the report parameter
   * @param type - the type of the parameter
   * @param description
   * @param query
   */
  public static buildReportParameter(id: string, type: ReportParameterType, description = "", query: ParamQuery = null)
  {
    return new ReportParameter(id, type, description, query);
  }

  /**
   * build a report parameter from its json definition
   * @param json
   */
  public static buildReportParameterFromJson(json: any)
  {
    return new ReportParameter(json.id, json.type, json.description);
  }
}
