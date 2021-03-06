module ::Rest::V1::Public::Account
  class SessionController < ::Rest::V1::ApiController

    # ==========================================================
    # Endpoints
    # ==========================================================

    # POST /public/account/login
    def login
      begin
        params.require([:email, :password])
        user = ::User.find_by!({email: params[:email].to_s})

        auth_service = ::Rbt::Auth::UserAuthService.new
        login_token = auth_service.get_login_token(user, params[:password].to_s)

        render json: {id: user.id, email: user.email, token: login_token}, status: @status
      rescue ::ActiveRecord::RecordNotFound, ActionController::ParameterMissing => e
        raise ::Rbt::Error::AuthError.new("Login Failed");
      end
    end

  end
end