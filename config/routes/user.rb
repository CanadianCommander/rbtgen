namespace :user do
  scope "/self" do


    # =============== Documents ================
    scope "/documents" do
      get "/", to: "document#get_documents"
    end
    scope "/document" do
      post "/", to: "document#add_document"

      scope "/:document_id" do
        get "/", to: "document#get_document"
        delete "/", to: "document#delete_document"
      end
    end
  end
end
