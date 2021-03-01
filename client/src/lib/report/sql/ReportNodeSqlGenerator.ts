import ReportNode from "@/lib/report/reportModel/ReportNode";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";
import NodeOutputSqlGenerator from "@/lib/report/sql/NodeOutputSqlGenerator";

export default class ReportNodeSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given report node.
   * @param reportNode
   */
  public static generateSql(reportNode: ReportNode): string
  {
    return this.generateSqlRootNode(reportNode);
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
    const selectFieldSql: string[] = [];
    reportNode.nodeOutputs.forEach((nodeOutput: NodeOutput) =>
    {
      selectFieldSql.push(NodeOutputSqlGenerator.generateSql(nodeOutput, reportNode, true));
    });

    return `
SELECT
${selectFieldSql.join(",\n")}
FROM
${reportNode.entity.name} AS ${reportNode.transientId};`;
  }

  /**
   * generate the sql for this node. treating it as a child
   * @param reportNode
   * @protected
   */
  protected static generateSqlChildNode(reportNode: ReportNode): string
  {
    console.log(reportNode);
    return "TODO";
  }

}
