import Entity from "@/lib/report/databaseModel/Entity";
import Field from "@/lib/report/databaseModel/Field";
import Filter from "@/lib/report/databaseModel/Filter";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";

export default class ReportNode
{
  protected _primaryEntity: Entity;
  protected _outputFields: Field[];
  protected _filters: Filter[];
  protected _childNodes: ReportNode[];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(primaryEntity: Entity, outputFields: Field[] = [], filters: Filter[] = [], childNodes: ReportNode[] = [])
  {
    this._primaryEntity = primaryEntity;
    this._outputFields = outputFields;
    this._filters = filters;
    this._childNodes = childNodes;
  }

  public pushChildNode(child: ReportNode): void
  {
    if (!this.isValidChild(child))
    {
      throw new ReportModelError(`Node with entity, ${this._primaryEntity.name} cannot be connected to child, ${child.entity.name}`);
    }

    this._childNodes.push(child);
  }

  public pushOutputFields(newField: Field): void
  {
    this._outputFields.push(newField);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  /**
   * get the primary entity of this node.
   */
  get entity(): Entity
  {
    return this._primaryEntity;
  }

  get childNodes(): ReportNode[]
  {
    return this._childNodes;
  }

  get childEntities(): Entity[]
  {
    return this._childNodes.map((node) => node.entity);
  }

  get outputFields(): Field[]
  {
    return this._outputFields;
  }

  /**
   * get a list of possible output fields that could be added to this node
   */
  get possibleOutputFields(): Field[]
  {
    let fields = this._primaryEntity.fields;

    if (this._childNodes)
    {
      fields = fields.concat(this._childNodes.map((node) => node.outputFields).flat());
    }

    return fields;
  }

  // ==========================================================
  // Protected methods
  // ==========================================================

  /**
   * check if a node can be a valid child of this node
   * @param node - the node to check
   * @return true if node is valid as a child of this node.
   * @protected
   */
  protected isValidChild(node: ReportNode): boolean
  {
    return this._primaryEntity.relatedEntities.includes(node.entity);
  }

}
