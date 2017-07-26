class RoomsController < ApplicationController
  def show
    @room = Room.find_by!(name: params.require(:name))

    respond_to do |format|
      format.html { render "bootstrap/index" }
      format.json
    end
  end
end
