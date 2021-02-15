module ::Rest::V1::Public::Account
  class SignupController < ::Rest::V1::ApiController

    # ==========================================================
    # Endpoints
    # ==========================================================

    # POST /public/account/signup
    def signup
      params.require([:email, :password])

      user_service = ::Rbt::User::UserService.new
      user_service.create_user(params[:email].to_s, params[:password].to_s)
    end

  end
end