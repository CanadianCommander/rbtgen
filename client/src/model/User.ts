import {LoginInfo} from "@/lib/api/generated";

export default class User
{
  protected _id: string;
  protected _email: string;

  // ==========================================================
  // Class methods
  // ==========================================================

  public static fromLoginInfo(loginInfo: LoginInfo): User
  {
    return new User(loginInfo.id, loginInfo.email);
  }

  // ==========================================================
  // public methods
  // ==========================================================

  public constructor(id: string, email: string)
  {
    this._id = id;
    this._email = email;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get id(): string
  {
    return this._id;
  }

  get email(): string
  {
    return this._email;
  }

}
