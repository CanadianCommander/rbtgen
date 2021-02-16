class User < ApplicationRecord

  # ==========================================================
  # Associations
  # ==========================================================

  # database schema files
  has_many_attached :schema_files
  # report by template files
  has_many_attached :report_blobs

  # ==========================================================
  # Validations
  # ==========================================================

  # email is formatted like email address
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