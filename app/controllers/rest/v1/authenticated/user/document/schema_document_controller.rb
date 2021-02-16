module ::Rest::V1::Authenticated::User::Document
  class SchemaDocumentController < ::Rest::V1::Authenticated::AuthBaseController

    # ==========================================================
    # Endpoints
    # ==========================================================

    # POST /user/document/schema/
    def add_schema_document
      params.require([:file_data, :file_name])
      user_document_service = ::Rbt::User::Document::DocumentService.new(@logged_in_user)

      new_blob = user_document_service.attach_document(
        params[:file_name].to_s,
        params[:file_data].to_s,
        ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA)
      render json: ::Transfer::User::Document.from_blob(new_blob, ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA), status: @stats
    end

  end
end