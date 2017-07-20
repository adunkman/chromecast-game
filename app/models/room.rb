class Room < ApplicationRecord
  validates :name,
    presence: true,
    uniqueness: { case_sensitive: false }

  has_many :players, through: :gaming_sessions
  has_many :games
end
