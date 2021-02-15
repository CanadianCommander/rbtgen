class User < ApplicationRecord

  # ==========================================================
  # Validations
  # ==========================================================

  # email is formatted like mail address
  validates :email, format: {with: /[^@]+@[^.]+\.[^.]+/}

  # ==========================================================
  # Class methods
  # ==========================================================

  # create a new user
  # @param [String] email - the users email
  # @param [String] password - the users password
  # @return [::User] - the new user
  def self.create_user(email, password)
    pass_hash, salt = ::Rbt::Util::Crypto.hash_password(password)
    return User.create!(
      {
        email: email,
        password: pass_hash,
        password_salt: salt,
      })
  end


end