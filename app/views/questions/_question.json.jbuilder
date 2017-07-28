json.(question, :id, :prompt, :answer, :explanation, :created_at, :updated_at)

if game.present?
  json.answers question.answers.where(game: game), partial: 'answers/answer', as: :answer
end
