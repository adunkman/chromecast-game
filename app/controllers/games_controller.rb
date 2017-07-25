class GamesController < ApplicationController
  def show
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.find_by!(room: @room, id: params.require(:id))

    respond_to do |format|
      format.html { render "application/index" }
      format.json
    end
  end

  def create
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.create!(room: @room, questions: new_game_questions)
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
