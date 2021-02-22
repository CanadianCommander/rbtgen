import LibraryItem from "@/model/library/LibraryItem";
import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";

export default class VirtualLibraryItem extends LibraryItem
{
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
    super(null, name, icon, description);
    this.actionCallback = actionCallback;
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
