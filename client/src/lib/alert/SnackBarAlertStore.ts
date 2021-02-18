import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";

@Module({dynamic: true, store, name: "SnackBarAlertStore", namespaced: true})
class SnackBarAlertStore extends VuexModule
{
  protected _alertText = "";
  protected _alertIcon = "";

  // ==========================================================
  // Actions
  // ==========================================================

  @Action({rawError: true})
  public showAlert(alertOptions: {text: string; icon: string}): void
  {
    this.setAlertText(alertOptions.text);
    this.setAlertIcon(alertOptions.icon);
  }

  // ==========================================================
  // Mutations
  // ==========================================================

  @Mutation
  public setAlertText(alertText: string): void
  {
    this._alertText = alertText;
  }

  @Mutation
  public setAlertIcon(alertIcon: string): void
  {
    this._alertIcon = alertIcon;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get alertText(): string
  {
    return this._alertText;
  }

  get alertIcon(): string
  {
    return this._alertIcon;
  }
}

export default getModule(SnackBarAlertStore);
