import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";
import User from "@/model/User";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {LoginInfo} from "@/lib/api/generated";

@Module({ dynamic: true, store, name: "AuthStore", namespaced: true })
class AuthStore extends VuexModule
{
  protected readonly COOKIE_TOKEN = "auth_cookie_token"
  protected readonly COOKIE_USER = "auth_cookie_user"

  protected _loginToken = "";
  protected _loggedInUser: User = null;

  // ==========================================================
  // Mutations
  // ==========================================================

  @Mutation
  public setLoginToken(loginToken: string): void
  {
    this._loginToken = loginToken;
  }

  @Mutation
  public setLoggedInUser(user: User): void
  {
    this._loggedInUser = user;
  }

  // ==========================================================
  // Actions
  // ==========================================================

  // store the login info in this store
  // @param loginInfo - the login info to set in to this store
  @Action
  public setLoginInfo(loginInfo: LoginInfo): void
  {
    this.setLoggedInUser(User.fromLoginInfo(loginInfo));
    this.setLoginToken(loginInfo.token);
  }

  // write auth data in to cookies (to remember login)
  @Action
  public writeAuthToCookies(): void
  {
    Cookies.set(this.COOKIE_TOKEN, this._loginToken);
    Cookies.set(this.COOKIE_USER, this._loggedInUser);
  }

  @Action
  public loadFromAuthCookies(): void
  {
    this.setLoginToken(Cookies.get(this.COOKIE_TOKEN) as string);
    this.setLoggedInUser(JSON.parse(Cookies.get(this.COOKIE_USER)) as User);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get loggedInUser(): User
  {
    return this._loggedInUser;
  }

  get isLoggedIn(): boolean
  {
    if (this._loginToken)
    {
      const decodedToken = jwtDecode(this._loginToken) as any;
      const date = Date.parse(decodedToken.expire);
      return date > Date.now();
    }
    return false;
  }
}

export default getModule(AuthStore);
