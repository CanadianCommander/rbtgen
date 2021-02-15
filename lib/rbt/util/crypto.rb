module ::Rbt::Util::Crypto

  # hash the given password
  # @param [String] password - the password to hash
  # @param [String] salt - salt string. If not provided a random one is generated
  # @return [String, String] hashed password, salt added to password
  def self.hash_password(password, salt = ::SecureRandom.uuid)
    hash = ::Digest::SHA2.new(512).hexdigest(password + salt)
    return hash, salt
  end

end