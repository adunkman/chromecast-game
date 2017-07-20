class AddScoreToGamingSession < ActiveRecord::Migration[5.1]
  def change
    add_column :gaming_sessions, :score, :integer
  end
end
