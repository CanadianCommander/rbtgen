Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :rest do
    namespace :v1 do

      # public api.
      draw(:public)

    end
  end
end
