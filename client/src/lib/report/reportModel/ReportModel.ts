import ReportNode from "@/lib/report/reportModel/ReportNode";

export default class ReportModel
{
  protected _rootNode: ReportNode;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(rootNode: ReportNode)
  {
    this._rootNode = rootNode;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set rootNode(newNode: ReportNode)
  {
    this._rootNode = newNode;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get rootNode(): ReportNode
  {
    return this._rootNode;
  }

}
