import LibraryItem from "@/model/library/LibraryItem";
import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";

export default class VirtualLibraryItem implements LibraryItem
{
  public id: string = null;
  public meta: any = null;
  public name: string;
  public icon: string;
  public description: string;

  protected actionCallback: () => void;
  public additionalActions: LibraryItemAction[] = [];

  // ==========================================================
  // Public Methods
  // ==========================================================

  public constructor(
    name: string,
    icon: string,
    description: string,
    actionCallback: () => void,
    additionalActions: LibraryItemAction[] = [])
  {
    this.name = name;
    this.actionCallback = actionCallback;
    this.icon = icon;
    this.description = description;
    this.additionalActions = additionalActions;
  }

  public primaryAction(): void
  {
    this.actionCallback();
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): LibraryItemType
  {
    return LibraryItemType.VIRTUAL;
  }
}
