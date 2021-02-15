namespace :public do
  namespace :account do
    post "/login", to: "session#login"
    post "/signup", to: "signup#signup"
  end
end