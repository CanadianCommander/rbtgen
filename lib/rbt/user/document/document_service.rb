module ::Rbt::User::Document
  class DocumentService

    module DOCUMENT_TYPE
      SCHEMA = "schema".freeze
      RBT = "rbt".freeze
    end

    # ==========================================================
    # Public Methods
    # ==========================================================

    # @param [::User]
    def initialize(user)
      @user = user
    end

    # attach a file to the user.
    # @param [String] file_name - the file name of the attaching file
    # @param [String] file_data - the file data to attach
    # @param [String] file_type - the type of file to attach
    # @return [::ActiveStorage::Blob] - the attached blob
    def attach_document(file_name, file_data, file_type)
      case (file_type)
      when DOCUMENT_TYPE::SCHEMA
        return self.attach_schema_file(file_name, file_data)
      when DOCUMENT_TYPE::RBT
        return self.attach_report_file(file_name, file_data);
      else
        raise ::StandardError.new("file_type is not one of ::Rbt::User::Document::DOCUMENT_TYPE")
      end
    end

    # delete the document identified by id
    # @param [String] document_id - the document id t delete
    def delete_document(document_id)
      doc = @user.get_document_by_id(document_id)
      if !doc.nil?
        doc.purge
      else
        raise ::Rbt::User::Document::Error::NoSuchDocumentError.new("document with id [#{document_id}] does not exist on user [#{@user.id}]")
      end
    end

    # ==========================================================
    # Protected Methods
    # ==========================================================
    protected

    # attach a schema file to the user.
    # @param [String] file_name - the file name of the attaching file
    # @param [String] file_data - the file data to attach
    # @return [::ActiveStorage::Blob] - the attached blob
    def attach_schema_file(file_name, file_data)
      unless (@user.schema_files.blobs.find {|blob| blob.filename === file_name}).nil?
        raise ::Rbt::User::Document::Error::DuplicateDocumentError.new("File with name: #{file_name} already exists for user: #{@user.id}")
      end

      @user.schema_files.attach(io: StringIO.new(file_data), filename: file_name)
      return @user.schema_files.blobs.find {|blob| blob.filename === file_name}
    end

    # attach a report file to the user.
    # @param [String] file_name - the file name of the attaching file
    # @param [String] file_data - the file data to attach
    # @return [::ActiveStorage::Blob] - the attached blob
    def attach_report_file(file_name, file_data)
      unless (@user.report_files.blobs.find {|blob| blob.filename === file_name}).nil?
        raise ::Rbt::User::Document::Error::DuplicateDocumentError.new("File with name: #{file_name} already exists for user: #{@user.id}")
      end

      @user.report_files.attach(io: StringIO.new(file_data), filename: file_name)
      return @user.report_files.blobs.find {|blob| blob.filename === file_name}
    end
  end
end