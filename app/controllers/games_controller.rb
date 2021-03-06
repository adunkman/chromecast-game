class GamesController < ApplicationController
  include NotificationConcern

  after_action :notify_room_of_games, only: [:create, :update]

  def index
    @room = Room.find_by!(name: params.require(:name))
  end

  def show
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.find_by!(room: @room, id: params.require(:id))

    respond_to do |format|
      format.html { render "bootstrap/index" }
      format.json
    end
  end

  def create
    @room = Room.find_by!(name: params.require(:name))

    if @room.games.unfinished.exists?
      @game = @room.games.unfinished.first
    else
      @game = Game.create!(room: @room, questions: new_game_questions)
    end
  end

  def update
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.find_by!(room: @room, id: params.require(:id))
    @game.update!(params.permit(:state))
  end

  private

  def new_game_questions
    Question.where.not(id: @room.questions).order("random()").limit(10)
  end
end
