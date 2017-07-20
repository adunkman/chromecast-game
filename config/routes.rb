Rails.application.routes.draw do
  defaults format: :json do
    resources :rooms, only: [:show, :create], param: :name do
      member do
        put "players/:client_id", to: "gaming_sessions#update", as: :player
        resources :games, only: [:create]
      end
    end

    resources :players, only: [:update], param: :client_id
  end
end
