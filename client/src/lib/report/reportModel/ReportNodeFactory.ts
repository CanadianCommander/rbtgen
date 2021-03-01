import Entity from "@/lib/report/databaseModel/Entity";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";
import NodeOutputFactory from "@/lib/report/reportModel/NodeOutputFactory";

export default class ReportNodeFactory
{
  // ==========================================================
  // Public methods
  // ==========================================================

  /**
   * build a new report node
   * @param entity - node primary entity
   * @return - the new node
   */
  public static newReportNode(entity: Entity): ReportNode
  {
    return new ReportNode(entity);
  }

  /**
   * build a report node from the given json
   * @param json - report node json
   * @param databaseModel - the database model for this report
   * @return a new report node
   */
  public static buildReportNodeFromJson(json: any, databaseModel: DatabaseModel): ReportNode
  {
    const entity = databaseModel.entities.find((entity) => entity.name === json.entityName);
    if (!entity)
    {
      throw new ReportModelError(`Entity [${json.entityName}] for report node could not be found in schema`);
    }

    const reportNode = new ReportNode(
      entity,
      NodeOutputFactory.buildNodeOutputsFromJson(json.nodeOutputs, databaseModel),
      [],
      this.buildReportNodesFromJson(json.childNodes, databaseModel));

    // node options
    reportNode.groupOutputs = json.options.groupOutputs;

    return reportNode;
  }

  /**
   * just like buildReportNodeFromJson but works on arrays
   * @param jsonArray - report node json
   * @param databaseModel - the database model for this report
   * @return a new report node
   */
  public static buildReportNodesFromJson(jsonArray: any, databaseModel: DatabaseModel): ReportNode[]
  {
    const newNodes: ReportNode[] = [];
    jsonArray.forEach((nodeJson: any) =>
    {
      newNodes.push(this.buildReportNodeFromJson(nodeJson, databaseModel));
    });
    return newNodes;
  }

}
