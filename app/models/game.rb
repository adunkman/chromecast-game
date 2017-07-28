class Game < ApplicationRecord
  belongs_to :room
  has_many :games_questions
  has_many :questions, through: :games_questions

  scope :unfinished, -> { where(state: nil).or(where.not(state: "completed")) }
end
