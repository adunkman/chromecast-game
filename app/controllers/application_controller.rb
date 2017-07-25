class ApplicationController < ActionController::Base
  before_action :redirect_to_new_room, if: :chromecast?, only: :index

  def index
  end

  private

  def chromecast?
    request.headers["User-Agent"] =~ /CrKey/
  end

  def redirect_to_new_room
    Room.transaction do
      @room = Room.create!(name: Room.unused_room_name)
    end

    redirect_to room_path(name: @room.name)
  end
end
