import Entity from "@/lib/report/databaseModel/Entity";
import Field from "@/lib/report/databaseModel/Field";
import Filter from "@/lib/report/databaseModel/Filter";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";
import NodeOutputFactory from "@/lib/report/reportModel/NodeOutputFactory";
import cryptoRandomString from "crypto-random-string";
import Relation from "@/lib/report/databaseModel/Relation";

export default class ReportNode
{

  // ==========================================================
  // Report graph variables
  // ==========================================================
  protected _transientId: string = "r" + cryptoRandomString({length: 16, type: "alphanumeric"});
  protected _primaryEntity: Entity;
  protected _nodeOutputs: NodeOutput[];
  protected _filters: Filter[];
  protected _childNodes: ReportNode[];
  protected _parentRelation: Relation = null;

  // ==========================================================
  // Node settings
  // ==========================================================

  // if true "group by" is applied to outputs
  protected _groupOutputs = false;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(primaryEntity: Entity, nodeOutputs: NodeOutput[] = [], filters: Filter[] = [], childNodes: ReportNode[] = [])
  {
    this._primaryEntity = primaryEntity;
    this._nodeOutputs = nodeOutputs;
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

  public pushNodeOutput(newOutput: NodeOutput): void
  {
    this._nodeOutputs.push(newOutput);
  }

  public addOutputFromField(newField: Field): void
  {
    this._nodeOutputs.push(NodeOutputFactory.buildNodeOutputFromField(newField));
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get transientId(): string
  {
    return this._transientId;
  }

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

  get groupOutputs(): boolean
  {
    return this._groupOutputs;
  }

  get childEntities(): Entity[]
  {
    return this._childNodes.map((node) => node.entity);
  }

  get nodeOutputs(): NodeOutput[]
  {
    return this._nodeOutputs;
  }

  get outputFields(): Field[]
  {
    return this._nodeOutputs.map((nodeOut) => nodeOut.field);
  }

  /**
   * get a list of possible output fields that could be added to this node
   */
  get possibleOutputFields(): NodeOutput[]
  {
    let outputs = NodeOutputFactory.buildNodeOutputFromFields(this._primaryEntity.fields);

    if (this._childNodes)
    {
      outputs = outputs.concat(this._childNodes.map((node) => node.nodeOutputs).flat());
    }

    return outputs;
  }

  get parentRelation(): Relation
  {
    return this._parentRelation;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set groupOutputs(group: boolean)
  {
    this._groupOutputs = group;
  }

  set parentRelation(relation: Relation)
  {
    this._parentRelation = relation;
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
