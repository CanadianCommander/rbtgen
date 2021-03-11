import Filter from "@/lib/report/databaseModel/Filter";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";

export default class NodeFilter
{
  protected _filter: Filter;
  protected _options: NodeFilterOption[] = [];

  // ==========================================================
  // Public Methods
  // ==========================================================

  /**
   *
   * @param filter - filter on which to base this node filter
   */
  constructor(filter: Filter)
  {
    this._filter = filter;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get filterType(): NodeFilterType
  {
    return NodeFilterType.CUSTOM_FILTER;
  }

  get name(): string
  {
    return this._filter.name;
  }

  get options(): NodeFilterOption[]
  {
    return this._options;
  }
}
