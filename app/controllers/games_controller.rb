class GamesController < ApplicationController
  def show
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.find_by!(room: @room, id: params.require(:id))
  end

  def create
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.create!(room: @room, questions: new_game_questions)
  end

  private

  def new_game_questions
    Question.where.not(id: @room.questions).order("RAND()").limit(10)
  end
end
