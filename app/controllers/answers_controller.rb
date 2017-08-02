class AnswersController < ApplicationController
  include NotificationConcern

  after_action :notify_room_of_games, only: [:create]

  def create
    @game = Game.find_by!(id: params.require(:game_id))
    @question = Question.find_by!(id: params.require(:question_id))
    @room = @game.room
    @player = Player.includes(:rooms).find_by!({
      rooms: {name: @room.name},
      client_id: client_id
    })

    @answer = Answer.find_or_create_by!(
      game: @game,
      question: @question,
      gaming_session: GamingSession.find_by!(room: @room, player: @player)
    )

    @answer.update!(answer: params.require(:answer).downcase)
  end
end
