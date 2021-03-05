import ReportNode from "@/lib/report/reportModel/ReportNode";
import Relation from "@/lib/report/databaseModel/Relation";
import {RelationType} from "@/lib/report/databaseModel/RelationType";
import ReportNodeSqlGenerator from "@/lib/report/sql/ReportNodeSqlGenerator";
import TemplateUtil from "@/lib/report/sql/TemplateUtil";

export default class RelationSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given relation
   * @param relation
   * @param parentNode - the parent node in the relation
   * @param childNode - the child node in the relation
   */
  public static generateSql(relation: Relation, parentNode: ReportNode, childNode: ReportNode): string
  {
    return `${this.generateJoin(relation)}
${ReportNodeSqlGenerator.generateSql(childNode, false)}
${this.generateOn(relation, parentNode)}`;
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  /**
   * generate the join statement for this relation
   * @param relation
   * @protected
   */
  protected static generateJoin(relation: Relation): string
  {
    switch (relation.type)
    {
      case RelationType.LEFT:
        return "LEFT JOIN";
      case RelationType.FULL:
        return "JOIN";
    }
  }

  /**
   * generate the ON condition for this relation
   * @param relation
   * @param parentNode
   * @protected
   */
  protected static generateOn(relation: Relation, parentNode: ReportNode): string
  {
    return `ON ${TemplateUtil.replaceColumnTags(relation.conditionSql, parentNode)}`;
  }
}
