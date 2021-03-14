import NodeFilterGeneric from "@/lib/report/reportModel/NodeFilterGeneric";
import NodeFilter from "@/lib/report/reportModel/NodeFilter";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import NodeFilterOptionSerializer from "@/lib/report/reportModel/NodeFilterOptionSerializer";

export default class NodeFilterSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * serialize a node filter to hash
   * @param filter - the filter to serialize
   * @return serialized node filter as hash
   */
  public static serializeHash(filter: NodeFilter): any
  {
    switch (filter.filterType)
    {
      case NodeFilterType.CUSTOM_FILTER:
        return this.serializeCustomFilter(filter);
      case NodeFilterType.GENERIC_FILTER:
        return this.serializeGenericFilter(filter as NodeFilterGeneric);
    }
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  /**
   * convert custom filter to hash
   * @param filter
   * @protected
   */
  protected static serializeCustomFilter(filter: NodeFilter): any
  {
    return {
      name: filter.name,
      type: filter.filterType,
      filterName: filter.filter.name,
      entity: filter.filter.entity.name,
      options: filter.options.map((opt) => NodeFilterOptionSerializer.serializeHash(opt)),
    };
  }

  /**
   * convert generic filter to hash
   * @param filter
   * @protected
   */
  protected static serializeGenericFilter(filter: NodeFilterGeneric): any
  {
    return {
      name: filter.name,
      type: filter.filterType,
      fieldName: filter.field.name,
      entity: filter.field.entity.name,
      options: filter.options.map((opt) => NodeFilterOptionSerializer.serializeHash(opt)),
    };
  }
}
