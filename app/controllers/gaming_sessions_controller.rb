class GamingSessionsController < ApplicationController
  def update
    @room = Room.find_by!(name: params.require(:name))
    @player = Player.find_by!(client_id: params.require(:client_id))

    GamingSession.create!(room: @room, player: @player)
  end
end
