class CreateGamesQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :games_questions do |t|
      t.belongs_to :game
      t.belongs_to :question
    end
  end
end
