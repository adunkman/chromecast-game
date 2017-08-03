class GamingSessionsController < ApplicationController
  include NotificationConcern

  after_action :notify_room_of_players, only: :update

  def update
    @room = Room.find_by!(name: params.require(:name))
    @player = Player.find_or_create_by!(client_id: client_id)

    GamingSession.find_or_create_by!(room: @room, player: @player)

    render json: {}
  end
end
