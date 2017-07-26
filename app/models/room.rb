class Room < ApplicationRecord
  validates :name,
    presence: true,
    uniqueness: { case_sensitive: false }

  has_many :gaming_sessions
  has_many :players, through: :gaming_sessions
  has_many :games
  has_many :games_questions, through: :games
  has_many :questions, through: :games_questions

  def self.unused_room_name
    iterations = 0
    loop do
      room_name = Haikunator.haikunate(0)
      if exists?(name: room_name)
        if (iterations += 1) > 100
          raise NameGeneratorError.new("Unable to generate unique room name")
        end
      else
        break room_name
      end
    end
  end

  class NameGeneratorError < StandardError; end
end
