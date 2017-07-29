json.(game, :id, :state, :created_at, :updated_at)
json.room_name game.room.name
json.questions game.questions, partial: 'questions/question', as: :question, locals: { game: game }
