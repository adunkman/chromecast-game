Rails.application.routes.draw do
  root to: "application#index"

  resources :rooms, only: [:show], param: :name do
    member do
      put "players/:client_id", to: "gaming_sessions#update", as: :player
      resources :games, only: [:show, :create, :update]
    end
  end

  resources :players, only: [:update], param: :client_id
end
