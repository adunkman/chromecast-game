class RoomsController < ApplicationController
  def show
    @room = Room.find_by!(name: params.require(:name))
  end

  def create
    Room.transaction do
      @room = Room.create!(name: new_room_name)
    end
  end

  private

  def new_room_name
    iterations = 0
    loop do
      room_name = Haikunator.haikunate(0)
      if Room.exists?(name: room_name)
        if (iterations += 1) > 100
          raise NameGeneratorError.new("Unable to generate unique room name")
        end
      else
        break room_name
      end
    end
  end

  class NameGeneratorError < StandardError; end
end
