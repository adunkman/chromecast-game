class AddGamingSessionsIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :gaming_sessions, [:room_id, :player_id], unique: true
  end
end
