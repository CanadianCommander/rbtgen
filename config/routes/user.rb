namespace :user do
  namespace :document do

    scope "/schema" do
      post "/", to: "schema_document#add_schema_document"
    end
  end
end
