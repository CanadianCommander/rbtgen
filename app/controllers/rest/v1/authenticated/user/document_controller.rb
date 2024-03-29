module ::Rest::V1::Authenticated::User
  class DocumentController < ::Rest::V1::Authenticated::AuthBaseController

    # ==========================================================
    # Collection Endpoints
    # ==========================================================

    # GET /user/self/documents/
    def get_documents
      params.require([:file_type])
      file_name = params[:file_name]&.to_s

      include_data = true
      unless params[:include_data].nil?
        include_data = ::ActiveModel::Type::Boolean.new.cast(params[:include_data]);
      end

      documents = []

      if file_name.present?
        Rails.logger.info(">>>>>>>>>>>>>>>>>>> file_name #{params[:file_name]} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        case params[:file_type].to_s
        when ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA
          documents = @logged_in_user.get_schema_documents_by_name(file_name);
        when ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::RBT
          documents = @logged_in_user.get_report_documents_by_name(file_name);
        end
      else
        documents = @logged_in_user.get_documents_by_type(params[:file_type].to_s).blobs
      end


      render(
        json: ::Transfer::User::Document.from_blobs(
          documents,
          type: ::Rbt::User::Document::DocumentService::DOCUMENT_TYPE::SCHEMA,
          include_data: include_data), status: @stats)
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
        Base64.decode64(params[:file_data].to_s),
        params[:file_type].to_s)
      render json: ::Transfer::User::Document.from_blob(new_blob, type: params[:file_type].to_s), status: @stats
    end

    # GET /user/self/document/:id
    def get_document
      params.require([:document_id])

      include_data = true
      unless params[:include_data].nil?
        include_data = ::ActiveModel::Type::Boolean.new.cast(params[:include_data]);
      end

      doc = @logged_in_user.get_document_by_id(params[:document_id].to_s)
      render json: ::Transfer::User::Document.from_blob(doc, include_data: include_data), status: @stats
    end

    # PUT /user/self/document/:id
    def update_document
      params.require([:document_id, :file_data, :file_type])
      document_service = ::Rbt::User::Document::DocumentService.new(@logged_in_user)

      # get info from old document
      doc = @logged_in_user.get_document_by_id(params[:document_id].to_s)
      filename = doc.filename

      # delete the old document
      document_service.delete_document(params[:document_id].to_s)

      # upload the new version
      updated_document = document_service.attach_document(filename, Base64.decode64(params[:file_data].to_s), params[:file_type].to_s)
      render json: ::Transfer::User::Document.from_blob(updated_document, type: params[:file_type].to_s), status: @stats
    end

    # DELETE /user/self/document/:id
    def delete_document
      params.require([:document_id])
      user_document_service = ::Rbt::User::Document::DocumentService.new(@logged_in_user)

      user_document_service.delete_document(params[:document_id].to_s)
    end


  end
end