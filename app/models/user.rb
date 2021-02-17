class User < ApplicationRecord

  # ==========================================================
  # Associations
  # ==========================================================

  # database schema files
  has_many_attached :schema_files
  # report by template files
  has_many_attached :report_files

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

  # ==========================================================
  # Public methods
  # ==========================================================

  # get user documents by type
  # @param [String] file_type the type of document to get
  # @return [ActiveStorage::Attached::Many]
  def get_documents_by_type(file_type)
    case file_type
    when ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA
      return self.schema_files
    when ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::RBT
      return self.report_files
    else
      raise ::StandardError.new("Unknown file type: #{file_type} when looking up user files")
    end
  end

  # get a document that is attached to this user by id
  # @param [String] document_id - the id of the document to get
  # @return [ActiveStorage::Attachment]
  def get_document_by_id(document_id)
    # look through both schema and report files for the document
    doc = self.get_schema_document_by_id(document_id)
    if doc.nil?
      doc = self.get_report_document_by_id(document_id)
    end

    return doc
  end

  # get a schema document that is attached to this user by id
  # @param [String] document_id - the id of the schema document to get
  # @return [ActiveStorage::Attachment]
  def get_schema_document_by_id(document_id)
    blob = self.schema_files.blobs.find_signed(document_id)

    unless blob.nil?
      return self.schema_files.attachments.where({blob_id: blob.id})
    end
    return nil
  end

  # get a report document that is attached to this user by id
  # @param [String] document_id - the id of the report document to get
  # @return [ActiveStorage::Attachment]
  def get_report_document_by_id(document_id)
    blob = self.report_files.blobs.find_signed(document_id)

    unless blob.nil?
      return self.report_files.attachments.where({blob_id: blob.id})
    end
    return nil
  end

end