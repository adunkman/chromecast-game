json.(game, :id, :created_at, :updated_at)
json.questions game.questions, partial: 'questions/question', as: :question
