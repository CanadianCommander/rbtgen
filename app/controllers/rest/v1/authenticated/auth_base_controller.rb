module ::Rest::V1::Authenticated
  class AuthBaseController < ::Rest::V1::ApiController

    attr_reader :logged_in_user

    # ==========================================================
    # Hooks
    # ==========================================================

    before_action :authenticate_user

    # ==========================================================
    # Protected Methods
    # ==========================================================
    protected

    # validate the users login token.
    def authenticate_user
      login_token = cookies[:auth_token]
      auth_service = ::Rbt::Auth::UserAuthService.new
      @logged_in_user = auth_service.validate_login_token(login_token)
    end
  end
end