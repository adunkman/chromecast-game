class Room < ApplicationRecord
  validates :name,
    presence: true,
    uniqueness: { case_sensitive: false }

  has_many :players, through: :gaming_sessions
  has_many :games
  has_many :games_questions, through: :games
  has_many :questions, through: :games_questions
end
