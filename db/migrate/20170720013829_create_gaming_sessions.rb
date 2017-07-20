class CreateGamingSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :gaming_sessions do |t|
      t.belongs_to :room, index: true
      t.belongs_to :player, index: true
      t.timestamps
    end
  end
end
