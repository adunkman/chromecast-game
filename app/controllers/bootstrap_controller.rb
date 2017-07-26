class BootstrapController < ApplicationController
  include ApplicationHelper

  before_action :redirect_to_new_room, only: :index, if: :chromecast?

  def index
  end

  private

  def redirect_to_new_room
    Room.transaction do
      @room = Room.create!(name: Room.unused_room_name)
    end

    redirect_to room_path(name: @room.name)
  end
end
