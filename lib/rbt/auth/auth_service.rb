module ::Rbt::Auth
  class AuthService

    LOGIN_TOKEN_DURATION = 7.days.freeze
    TOKEN_VERSION = "1.0.0"

    # ==========================================================
    # Public Methods
    # ==========================================================

    # validate the given login token
    # @param [String] login_token - the token to validate
    # @return [::User] user - the user represented by this token.
    # @raise [::Rbt::Error::AuthError] - if the token is invalid
    def validate_login_token(login_token)
      if login_token.nil?
        raise ::Rbt::Error::AuthError.new("No login token")
      end

      decoded_token = JWT.decode(login_token, Rails.application.credentials.login_token_key, true)[0]
      decoded_token = decoded_token.with_indifferent_access

      # check expiry time
      if decoded_token[:expire] < Time.now
        raise ::Rbt::Error::AuthError.new("Login token expired")
      end

      return ::User.find_by!({email: decoded_token[:email]})
    end

    # get a login token for the given user
    # @param [::User] user - the user to get the token for
    # @param [String] password - the "challenge" password to try to get the login token with
    # @return [String] login_token
    def get_login_token(user, password)
      challenge_password, _ = ::Rbt::Util::Crypto.hash_password(password, user.password_salt)
      if challenge_password == user.password
        return self.generate_login_token(user)
      else
        raise ::Rbt::Error::AuthError.new("Login failed")
      end
    end

    # ==========================================================
    # Protected Methods
    # ==========================================================
    protected

    # generate login token for user
    # @param [::User] user - the user to generate the token for
    # @return [String] the token
    def generate_login_token(user)
      return JWT.encode(
        {
          email: user.email,
          expire: Time.now + LOGIN_TOKEN_DURATION,
          version: TOKEN_VERSION,
        }, Rails.application.credentials.login_token_key)
    end

  end
end
