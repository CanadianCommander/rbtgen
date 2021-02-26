import Relation from "@/lib/report/databaseModel/Relation";
import DatabaseModelError from "@/lib/report/databaseModel/error/DatabaseModelError";
import Entity from "@/lib/report/databaseModel/Entity";
import Field from "@/lib/report/databaseModel/Field";

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

    // map required fields
    const requiredFields: Field[] = [];
    relationDef.required_fields.forEach((field: string) =>
    {
      const newField: Field = toEntity.getFieldByName(field);
      if (newField === null)
      {
        throw new DatabaseModelError(`The required field [${field}] of relation [${relationName}] could not be found`);
      }
      else
      {
        requiredFields.push(newField);
      }
    });

    return new Relation(
      relationName,
      onEntity,
      toEntity,
      requiredFields,
      relationDef.type ? relationDef.type : "left",
      relationDef.condition);
  }
}
