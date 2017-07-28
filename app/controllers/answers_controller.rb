class AnswersController < ApplicationController
  include NotificationConcern

  after_action :notify_room_of_games, only: [:create]

  def create
    @room = Room.find_by!(name: params.require(:name))
    @game = Game.find_by!(room: @room, id: params.require(:id))
    @player = Player.includes(:rooms).find_by!({
      rooms: {name: params.require(:name)},
      client_id: params.require(:client_id)
    })

    Answer.create!(
      game: @game,
      question_id: params.require(:question_id),
      gaming_session: GamingSession.find_by!(room: @room, player: @player),
      answer: params.require(:answer)
    )
  end
end
