import ReportNode from "@/lib/report/reportModel/ReportNode";
import ReportParameter from "@/lib/report/reportModel/ReportParameter";

export default class ReportModel
{
  protected _rootNode: ReportNode;
  protected _parameters: ReportParameter[];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(rootNode: ReportNode, parameters: ReportParameter[])
  {
    this._rootNode = rootNode;
    this._parameters = parameters;
  }

  /**
   * add a parameter to the report
   * @param param - the parameter to add
   */
  public addParam(param: ReportParameter): void
  {
    this._parameters.push(param);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get rootNode(): ReportNode
  {
    return this._rootNode;
  }

  get parameters(): ReportParameter[]
  {
    return this._parameters;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set rootNode(newNode: ReportNode)
  {
    this._rootNode = newNode;
  }

  set parameters(params: ReportParameter[])
  {
    this._parameters = params;
  }

}
