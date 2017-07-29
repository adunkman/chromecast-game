class Choice < ApplicationRecord
  belongs_to :game
  belongs_to :question
  belongs_to :gaming_session
  has_one :player, through: :gaming_session

  def chosen_player
    chosen_player_id ? Player.find(chosen_player_id) : nil
  end
end
