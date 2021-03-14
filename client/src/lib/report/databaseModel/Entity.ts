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

  /**
   * find a field on this entity by name
   * @param fieldName - the name of the field to get
   * @return field or null if not found.
   */
  public getFieldByName(fieldName: string): Field
  {
    return this.fields.find((field) => field.name === fieldName);
  }

  /**
   * get a relation on this entity by name
   * @param relationName - the relation name to look for
   */
  public getRelationByName(relationName: string): Relation
  {
    return this.relations.find((relation) => relation.name === relationName);
  }

  /**
   * get entity filter by name
   * @param filterName - the name of the filter to look for
   * @return - the found filter or null.
   */
  public getFilterByName(filterName: string): Filter
  {
    return this.filters.find((filter) => filter.name === filterName);
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

  get filters(): Filter[]
  {
    return this._filters;
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
    this.linkFiltersToSelf(filters);
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

  /**
   * link this list of filters to this entity
   * @param filters - the filters to link
   * @protected
   */
  protected linkFiltersToSelf(filters: Filter[]): void
  {
    filters.forEach((filter) =>
    {
      filter.entity = this;
    });
  }

}
