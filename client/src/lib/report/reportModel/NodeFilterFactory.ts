import Filter from "@/lib/report/databaseModel/Filter";
import NodeFilter from "@/lib/report/reportModel/NodeFilter";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import Field from "@/lib/report/databaseModel/Field";
import NodeFilterGeneric from "@/lib/report/reportModel/NodeFilterGeneric";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";
import NodeFilterOptionFactory from "@/lib/report/reportModel/NodeFilterOptionFactory";
import ReportParameter from "@/lib/report/reportModel/ReportParameter";

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
   * build a node filter from the json definition of a node filter
   * @param json - json definition of the node filter
   * @param databaseModel
   * @param params - report parameters
   */
  public static buildNodeFilterFromJson(json: any, databaseModel: DatabaseModel, params: ReportParameter[]): NodeFilter
  {
    let nodeFilter = null;
    const type = json.type as NodeFilterType;
    const entity = databaseModel.getEntityByName(json.entity);
    if (!entity)
    {
      throw new ReportModelError(`Entity [${json.entity}] for filter [${json.name}] does not exist in spec`);
    }

    switch (type)
    {
      case NodeFilterType.CUSTOM_FILTER:
        if (!entity.getFilterByName(json.filterName))
        {
          throw new ReportModelError(`Filter [${json.name}] references entity [${json.entity}] filter [${json.filterName}] that does not exist`);
        }
        nodeFilter = this.buildNodeFilterFromFilter(entity.getFilterByName(json.filterName));
        break;
      case NodeFilterType.GENERIC_FILTER:
        if (!entity.getFieldByName(json.fieldName))
        {
          throw new ReportModelError(`Filter [${json.name}] references entity [${json.entity}] field [${json.fieldName}] that does not exist`);
        }
        nodeFilter = this.buildNodeFilterFromField(entity.getFieldByName(json.fieldName));
        break;
    }

    nodeFilter.options = json.options.map((optDef: any) => NodeFilterOptionFactory.buildNodeFilterOptionFromJson(optDef, params));

    return nodeFilter;
  }

  /**
   * plural of buildNodeFilterFromJson
   * @param json - json array of node filter definitions
   * @param databaseModel
   * @param params - report parameters
   */
  public static buildNodeFiltersFromJson(json: any, databaseModel: DatabaseModel, params: ReportParameter[]): NodeFilter[]
  {
    return json.map((filterDef: any) =>
    {
      return this.buildNodeFilterFromJson(filterDef, databaseModel, params);
    });
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
