class Question < ApplicationRecord
  has_many :games_questions
  has_many :games, through: :games_questions
  has_many :answers
  has_many :choices
end
