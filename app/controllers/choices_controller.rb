class ChoicesController < ApplicationController
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

    answer_id = params.require(:answer_id)

    if answer_id != "correct"
      @chosen_answer_player = Player.includes(:rooms).find_by!({
        rooms: {name: @room.name},
        client_id: answer_id
      })
    end

    @choice = Choice.find_or_create_by!({
      game: @game,
      question: @question,
      gaming_session: GamingSession.find_by!(room: @room, player: @player)
    })

    @choice.update!(
      is_correct: answer_id == "correct",
      chosen_player_id: @chosen_answer_player.try(:id)
    )
  end
end
