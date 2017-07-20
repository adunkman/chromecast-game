class Game < ApplicationRecord
  belongs_to :room
  has_many :games_questions
  has_many :questions, through: :games_questions
end
