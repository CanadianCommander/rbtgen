module ::Rbt::User
  class UserService

    # ==========================================================
    # Public Methods
    # ==========================================================

    # create a new user
    # @param [String] email - the users email
    # @param [String] password - the users password
    # @return [::User] - the new user
    def create_user(email, password)
      return ::User.create_user(email, password)
    end

  end
end