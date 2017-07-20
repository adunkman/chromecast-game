class GamingSession < ApplicationRecord
  belongs_to :player
  belongs_to :room
end
