import NodeOutput from "@/lib/report/reportModel/NodeOutput";

export default class NodeOutputSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize a node output as hash
   * @param nodeOutput - the output to serialize
   * @return the node output serialized as hash.
   */
  public static serializeHash(nodeOutput: NodeOutput): any
  {
    return {
      entity: nodeOutput.entity.name,
      field: nodeOutput.field.name,
      alias: nodeOutput.alias,
      staticPrefix: nodeOutput.staticPrefix,
      staticSuffix: nodeOutput.staticSuffix,
      aggregation: nodeOutput.aggregator?.toHash(),
    };
  }
}
