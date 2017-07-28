Rails.application.routes.draw do
  root to: "bootstrap#index"

  resources :rooms, only: [:show], param: :name do
    member do
      put "players/:client_id", to: "gaming_sessions#update", as: :player
      get "players/:client_id", to: "players#show"
      resources :players, only: [:index]
      resources :games do
        member do
          resources :answers, only: [:create]
        end
      end
    end
  end

  resources :players, only: [:update], param: :client_id
end
