Rails.application.routes.draw do
  root to: "bootstrap#index"

  resources :rooms, only: [:show], param: :name do
    member do
      put "players/:client_id", to: "gaming_sessions#update", as: :player
      get "players/:client_id", to: "players#show"
      resources :players, only: [:index]
      resources :games
    end
  end

  resources :players, only: [:update], param: :client_id

  post "games/:game_id/questions/:question_id/answers", to: "answers#create"
  post "games/:game_id/questions/:question_id/choices", to: "choices#create"
end
