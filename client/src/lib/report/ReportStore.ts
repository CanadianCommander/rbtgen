import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import ReportNode from "@/lib/report/reportModel/ReportNode";

@Module({ dynamic: true, store, name: "ReportStore", namespaced: true })
class ReportStore extends VuexModule
{
  protected _selectedNode: ReportNode = null;

  // ==========================================================
  // Actions
  // ==========================================================

  // ==========================================================
  // Mutations
  // ==========================================================

  @Mutation
  public setSelectedNode(reportNode: ReportNode)
  {
    this._selectedNode = reportNode;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get selectedNode(): ReportNode
  {
    return this._selectedNode;
  }
}

export default getModule(ReportStore);
