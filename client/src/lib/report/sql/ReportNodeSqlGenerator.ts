import ReportNode from "@/lib/report/reportModel/ReportNode";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";
import NodeOutputSqlGenerator from "@/lib/report/sql/NodeOutputSqlGenerator";
import RelationSqlGenerator from "@/lib/report/sql/RelationSqlGenerator";

export default class ReportNodeSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given report node.
   * @param reportNode
   * @param root - if true treat this node as root node.
   */
  public static generateSql(reportNode: ReportNode, root: boolean): string
  {
    if (root)
    {
      return this.generateSqlRootNode(reportNode);
    }
    else
    {
      return this.generateSqlChildNode(reportNode);
    }
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  /**
   * generate the sql for this node. treating it as the root
   * @param reportNode - the root node of the report
   * @protected
   */
  protected static generateSqlRootNode(reportNode: ReportNode): string
  {
    const selectSql = this.generateSelect(reportNode, true);
    const groupBySql = this.generateGroupBy(reportNode);
    const joinsSql = this.generateJoins(reportNode);

    return `
${selectSql}
FROM
${reportNode.entity.name} AS ${reportNode.transientId}
${joinsSql}
${groupBySql};`;
  }

  /**
   * generate the sql for this node. treating it as a child
   * @param reportNode
   * @protected
   */
  protected static generateSqlChildNode(reportNode: ReportNode): string
  {
    const selectSql = this.generateSelect(reportNode, false);
    const groupBySql = this.generateGroupBy(reportNode);
    const joinsSql = this.generateJoins(reportNode);

    return `(
${selectSql}
FROM
${reportNode.entity.name} AS ${reportNode.transientId}
${joinsSql}
${groupBySql}
)
AS ${reportNode.transientId}`;
  }

  /**
   * generate sql for the group by statement of a node
   * @param reportNode - node to generate the group by for
   * @protected
   */
  protected static generateGroupBy(reportNode: ReportNode): string
  {
    // collect fields for GROUP BY
    let groupBySql = "";
    if (reportNode.groupOutputs)
    {
      groupBySql = "GROUP BY ";
      const groupFieldNames: string[] = [];
      reportNode.nodeOutputs.forEach((nodeOutput: NodeOutput) =>
      {
        if (!nodeOutput.aggregator)
        {
          groupFieldNames.push(NodeOutputSqlGenerator.generateFieldSql(nodeOutput, reportNode));
        }
      });
      groupBySql += groupFieldNames.join(", ");
    }
    return groupBySql;
  }

  /**
   * generate select SQL for a report node
   * @param reportNode - the node to generate for
   * @param root - if true generate for root node
   * @protected
   */
  protected static generateSelect(reportNode: ReportNode, root: boolean): string
  {
    const selectFieldSql: string[] = [];
    reportNode.nodeOutputs.forEach((nodeOutput: NodeOutput) =>
    {
      selectFieldSql.push(NodeOutputSqlGenerator.generateSql(nodeOutput, reportNode, root));
    });

    if (selectFieldSql.length > 0)
    {
      return `SELECT \n${selectFieldSql.join(",\n")}`;
    }
    return "";
  }

  /**
   * generate JOIN sql for child tables
   * @param reportNode - the node to generate for
   * @protected
   */
  protected static generateJoins(reportNode: ReportNode): string
  {
    let sql = "";
    reportNode.childNodes.forEach((childNode: ReportNode) =>
    {
      sql += RelationSqlGenerator.generateSql(childNode.parentRelation, reportNode, childNode);
    });
    return sql;
  }

}
