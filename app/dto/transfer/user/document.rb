module ::Transfer::User
  class Document
    attr_accessor :id, :file_name, :file_data, :file_type

    # ==========================================================
    # Class Methods
    # ==========================================================

    # build a Document transfer from a blobs
    # @param [Array<::ActiveStorage::Blob>] blobs - the blobs to build the transfer for.
    # @param [String] type - the type of the blobs
    # @param [Boolean] include_data - if true data will be included in transfer
    # @return [Array<::Transfer::User::Document>]
    def self.from_blobs(blobs, type: "", include_data: true)
      return blobs.map {|blob| ::Transfer::User::Document.from_blob(blob, type: type, include_data: include_data)}
    end

    # build a Document transfer from a blob
    # @param [::ActiveStorage::Blob] blob - the blob to build the transfer for.
    # @param [String] type - the type of the blob
    # @param [Boolean] include_data - if true data will be included in transfer
    # @return [::Transfer::User::Document]
    def self.from_blob(blob, type: "", include_data: true)
      return ::Transfer::User::Document.new(
        blob.signed_id,
        blob.filename,
        include_data ? Base64.encode64(blob.download) : nil,
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