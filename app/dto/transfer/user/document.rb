module ::Transfer::User
  class Document
    attr_accessor :id, :file_name, :file_data, :file_type

    # ==========================================================
    # Class Methods
    # ==========================================================

    # build a Document transfer from a blob
    # @param [::ActiveStorage::Blob] blob - the blob to build the transfer for.
    # @param [String] type - the type of the blob
    # @return [::Transfer::User::Document]
    def self.from_blob(blob, type)
      return ::Transfer::User::Document.new(
        blob.signed_id,
        blob.filename,
        blob.download,
        type
      )
    end

    # ==========================================================
    # Public Methods
    # ==========================================================

    def initialize(id, file_name, file_data, file_type)
      @id = id
      @file_name = file_name
      @file_data = file_data
      @file_type = file_type
    end

  end
end