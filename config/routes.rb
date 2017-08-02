Rails.application.routes.draw do
  root to: "bootstrap#index"

  resources :rooms, only: [:show], param: :name do
    member do
      put "players", to: "gaming_sessions#update", as: :player
      get "players", to: "players#show"
      resources :players, only: [:index]
      resources :games
    end
  end

  patch "players", to: "players#update", as: :player

  post "games/:game_id/questions/:question_id/answers", to: "answers#create"
  post "games/:game_id/questions/:question_id/choices", to: "choices#create"
end
