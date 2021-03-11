import Filter from "@/lib/report/databaseModel/Filter";
import NodeFilter from "@/lib/report/reportModel/NodeFilter";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import Field from "@/lib/report/databaseModel/Field";
import NodeFilterGeneric from "@/lib/report/reportModel/NodeFilterGeneric";

export default class NodeFilterFactory
{
  // ==========================================================
  // Public Class Methods
  // ==========================================================

  /**
   * build a new node filter from the given filter
   * @param filter - the filter to base the node filter off
   * @return the new node filter
   */
  public static buildNodeFilterFromFilter(filter: Filter): NodeFilter
  {
    return new NodeFilter(filter);
  }

  /**
   * build a new node filter for the given field
   * @param field - the field to base the filter on
   * @return the new node filter
   */
  public static buildNodeFilterFromField(field: Field): NodeFilter
  {
    return new NodeFilterGeneric(field);
  }

  /**
   * build all possible node filters for an entity.
   * @param reportNode - the report node to build node filters for
   */
  public static buildAllNodeFiltersForReportNode(reportNode: ReportNode): NodeFilter[]
  {
    const nodeFilters: NodeFilter[] = [];
    
    if (reportNode.entity.filters)
    {
      reportNode.entity.filters.forEach((filter) => nodeFilters.push(this.buildNodeFilterFromFilter(filter)));
    }

    if (reportNode.entity.fields)
    {
      reportNode.entity.fields.forEach((field) => nodeFilters.push(this.buildNodeFilterFromField(field)));
    }

    return nodeFilters;
  }

}
