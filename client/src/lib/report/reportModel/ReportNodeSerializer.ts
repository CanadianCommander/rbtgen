import ReportNode from "@/lib/report/reportModel/ReportNode";
import NodeOutputSerializer from "@/lib/report/reportModel/NodeOutputSerializer";

export default class ReportNodeSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize a report node to hash
   * @param reportNode - the report node to serialize
   * @return serialized report node as hash
   */
  public static serializeHash(reportNode: ReportNode): any
  {
    return {
      entityName: reportNode.entity.name,
      filters: [],
      childNodes: reportNode.childNodes.map((node) => this.serializeHash(node)),
      nodeOutputs: reportNode.nodeOutputs.map((output) => NodeOutputSerializer.serializeHash(output)),
      options: {
        groupOutputs: reportNode.groupOutputs,
      },
    };
  }
}
