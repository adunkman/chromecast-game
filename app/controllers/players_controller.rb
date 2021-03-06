class PlayersController < ApplicationController
  include NotificationConcern

  after_action :notify_player_rooms_of_players, only: :update

  def index
    @players = Room.find_by!(name: params.require(:name)).players
  end

  def show
    @player = Player.includes(:rooms).find_or_create_by!({
      rooms: {name: params.require(:name)},
      client_id: client_id
    })

    render "bootstrap/index"
  end

  def update
    @player = Player.find_or_create_by!(client_id: client_id)
    @player.update!(params.permit(:name))
  end
end
