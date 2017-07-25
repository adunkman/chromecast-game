class RoomsController < ApplicationController
  def show
    @room = Room.find_by!(name: params.require(:name))

    respond_to do |format|
      format.html { render "application/index" }
      format.json
    end
  end
end
