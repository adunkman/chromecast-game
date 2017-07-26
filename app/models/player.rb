class Player < ApplicationRecord
  validates :client_id,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: /\A[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}\z/ }

  has_many :gaming_sessions
  has_many :rooms, through: :gaming_sessions
end
