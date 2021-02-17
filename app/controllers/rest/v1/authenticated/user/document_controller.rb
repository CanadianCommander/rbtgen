module ::Rest::V1::Authenticated::User
  class DocumentController < ::Rest::V1::Authenticated::AuthBaseController

    # ==========================================================
    # Collection Endpoints
    # ==========================================================

    # GET /user/self/documents/
    def get_documents
      params.require([:file_type])

      include_data = true
      unless params[:include_data].nil?
        include_data = ::ActiveModel::Type::Boolean.new.cast(params[:include_data]);
      end

      render(
        json: ::Transfer::User::Document.from_blobs(@logged_in_user.get_documents_by_type(params[:file_type].to_s).blobs,
        ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA, include_data), status: @stats)
    end

    # ==========================================================
    # Singular Endpoints
    # ==========================================================

    # POST /user/self/document/
    def add_document
      params.require([:file_data, :file_name, :file_type])
      user_document_service = ::Rbt::User::Document::DocumentService.new(@logged_in_user)

      new_blob = user_document_service.attach_document(
        params[:file_name].to_s,
        params[:file_data].to_s,
        params[:file_type].to_s)
      render json: ::Transfer::User::Document.from_blob(new_blob, params[:file_type].to_s), status: @stats
    end

    # DELETE /user/self/document/:id
    def delete_document
      params.require([:document_id])
      user_document_service = ::Rbt::User::Document::DocumentService.new(@logged_in_user)

      user_document_service.delete_document(params[:document_id].to_s)
    end
  end
end