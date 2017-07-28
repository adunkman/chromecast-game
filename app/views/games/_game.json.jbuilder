json.(game, :id, :state, :created_at, :updated_at)
json.questions game.questions, partial: 'questions/question', as: :question, locals: { game: game }
