class CreateChoices < ActiveRecord::Migration[5.1]
  def change
    create_table :choices do |t|
      t.belongs_to :game
      t.belongs_to :question
      t.belongs_to :gaming_session
      t.boolean :is_correct
      t.integer :chosen_player_id
    end
  end
end
