import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";

export default class NodeFilterOptionSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize a node filter option to hash
   * @param option - the option to serialize
   * @return - the serialize hash
   */
  public static serializeHash(option: NodeFilterOption): any
  {
    return {
      type: option.type,
      name: option.name,
      identifier: option.identifier,
      value: option.value,
      options: option.options,
    };
  }
}
