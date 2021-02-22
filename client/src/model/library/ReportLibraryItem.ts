import LibraryItem from "@/model/library/LibraryItem";
import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";
import {userApi} from "@/lib/api/Api";
import {appRouter} from "@/router/appRouter";
import {EditorRoutes} from "@/router/routes/EditorRoutes";

export default class ReportLibraryItem extends LibraryItem
{
  protected onChange: () => void

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(
    id: string,
    name: string,
    icon: string,
    description = "",
    meta: any = null,
    onChange: () => void = null)
  {
    super(id, name, icon, description, meta);
    this.onChange = onChange;
  }

  public primaryAction(): void
  {
    appRouter.toRoute(EditorRoutes.EDITOR, {reportId: this.id});
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): LibraryItemType
  {
    return LibraryItemType.RBT;
  }

  get additionalActions(): LibraryItemAction[]
  {
    return [
      {text: "Download", callback: this.downloadReport.bind(this)},
      {text: "Delete", callback: this.deleteReport.bind(this)},
    ];
  }

  // ==========================================================
  // Protected methods
  // ==========================================================

  protected downloadReport(): void
  {
    // TODO this
  }

  protected async deleteReport(): Promise<void>
  {
    // TODO confirm, lol.

    await userApi.deleteDocument(this.id);

    if (this.onChange)
    {
      this.onChange();
    }
  }
}
