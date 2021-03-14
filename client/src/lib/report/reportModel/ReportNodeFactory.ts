import Entity from "@/lib/report/databaseModel/Entity";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";
import NodeOutputFactory from "@/lib/report/reportModel/NodeOutputFactory";
import Relation from "@/lib/report/databaseModel/Relation";
import NodeFilterFactory from "@/lib/report/reportModel/NodeFilterFactory";

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
   * @param parentEntity - the entity of the parent of this node or null
   * @return a new report node
   */
  public static buildReportNodeFromJson(json: any, databaseModel: DatabaseModel, parentEntity: Entity): ReportNode
  {
    const entity = databaseModel.entities.find((entity) => entity.name === json.entityName);
    if (!entity)
    {
      throw new ReportModelError(`Entity [${json.entityName}] for report node could not be found in schema`);
    }

    const reportNode = new ReportNode(
      entity,
      NodeOutputFactory.buildNodeOutputsFromJson(json.nodeOutputs, databaseModel),
      NodeFilterFactory.buildNodeFiltersFromJson(json.filters, databaseModel),
      this.buildReportNodesFromJson(json.childNodes, databaseModel, entity));

    if (json.parentRelationName)
    {
      // load parent relation
      const parentRelation: Relation = parentEntity.getRelationByName(json.parentRelationName);
      if (!parentRelation)
      {
        throw new ReportModelError(`Relation [${json.parentRelationName}] could not be found on entity [${parentEntity.name}]`);
      }

      reportNode.parentRelation = parentRelation;
    }

    // node options
    reportNode.groupOutputs = json.options.groupOutputs;

    return reportNode;
  }

  /**
   * just like buildReportNodeFromJson but works on arrays
   * @param jsonArray - report node json
   * @param databaseModel - the database model for this report
   * @param parentEntity - the entity of the parent of these nodes or null
   * @return a new report node
   */
  public static buildReportNodesFromJson(jsonArray: any, databaseModel: DatabaseModel, parentEntity: Entity): ReportNode[]
  {
    const newNodes: ReportNode[] = [];
    jsonArray.forEach((nodeJson: any) =>
    {
      newNodes.push(this.buildReportNodeFromJson(nodeJson, databaseModel, parentEntity));
    });
    return newNodes;
  }

}
