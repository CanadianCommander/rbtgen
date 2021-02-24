import Field from "@/lib/report/databaseModel/Field";
import Relation from "@/lib/report/databaseModel/Relation";
import Filter from "@/lib/report/databaseModel/Filter";

export default class Entity
{
  protected _name: string;
  protected _fields: Field[] = [];
  protected _relations: Relation[] = [];
  protected _filters: Filter[] = [];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string)
  {
    this._name = name;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get name(): string
  {
    return this._name;
  }

  get relations(): Relation[]
  {
    return this._relations;
  }

  get fields(): Field[]
  {
    return this._fields;
  }

  /**
   * get all entities this entity is related to. only covers outgoing relations.
   * @return list of related entities
   */
  get relatedEntities(): Entity[]
  {
    if (!this.relations)
    {
      return [];
    }

    return this.relations.map((relation) => relation.to);
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set fields(fields: Field[])
  {
    this._fields = fields;
    this.linkFieldsToSelf(fields);
  }

  set relations(relations: Relation[])
  {
    this._relations = relations;
  }

  set filters(filters: Filter[])
  {
    this._filters = filters;
  }

  // ==========================================================
  // Protected methods
  // ==========================================================

  /**
   * link the list of fields to this entity
   * @param fields - the fields to link
   * @protected
   */
  protected linkFieldsToSelf(fields: Field[]): void
  {
    // link fields with this entity
    fields.forEach((field) =>
    {
      field.entity = this;
    });
  }

}
