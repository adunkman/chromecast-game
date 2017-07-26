class PlayersController < ApplicationController
  include NotificationConcern

  after_action :notify_player_rooms_of_players, only: :update

  def index
    @players = Room.find_by!(name: params.require(:name)).players
  end

  def show
    @player = Player.includes(:rooms).find_by!({
      rooms: {name: params.require(:name)},
      client_id: "55182e8c-f4c1-4919-9495-343e437542c4"
    })

    render "bootstrap/index"
  end

  def update
    @player = Player.find_or_create_by!(client_id: params.require(:client_id))
    @player.update!(params.permit(:name))
  end
end
