class PlayersController < ApplicationController
  def update
    @player = Player.find_or_create_by!(client_id: params.require(:client_id))
    @player.update!(params.permit(:name))
  end
end
