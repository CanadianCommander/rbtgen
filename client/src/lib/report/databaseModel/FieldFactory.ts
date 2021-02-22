import Field from "@/lib/report/databaseModel/Field";

export default class FieldFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * build a Field form a field def
   * @param fieldName - the name of the field
   * @param fieldDef - the field def found in the schema file
   * @return new field
   * @protected
   */
  public static buildFieldFromSchemaDef(fieldName: string, fieldDef: any): Field
  {
    return new Field(fieldName, fieldDef.type, fieldDef.key === "pri", fieldDef.sql);
  }
}
