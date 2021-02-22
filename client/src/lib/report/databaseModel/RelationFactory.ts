import Relation from "@/lib/report/databaseModel/Relation";
import DatabaseModelError from "@/lib/report/databaseModel/error/DatabaseModelError";
import Entity from "@/lib/report/databaseModel/Entity";

export default class RelationFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * build a Relation form a relation def
   * @param relationName - the name of the relation
   * @param relationDef - the relation def found in the schema file
   * @param onEntity - the entity that the relation is on.
   * @param entities - entities in the schema. used to map the relation.
   * @return new relation
   * @protected
   */
  public static buildRelationFromSchemaDef(relationName: string, relationDef: any, onEntity: Entity, entities: Entity[]): Relation
  {
    const toEntity = entities.find((entity) => entity.name === relationDef.to);

    if (toEntity === null)
    {
      throw new DatabaseModelError(`Database relation ${relationName} specifies unknown "to" table: ${relationDef.to}`);
    }

    return new Relation(
      relationName,
      onEntity,
      toEntity,
      relationDef.type ? relationDef.type : "left",
      relationDef.condition);
  }
}
