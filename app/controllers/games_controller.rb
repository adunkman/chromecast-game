class GamesController < ApplicationController
  def create
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.create!(room: @room)
  end
end
