class CreateAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :answers do |t|
      t.belongs_to :game
      t.belongs_to :question
      t.belongs_to :gaming_session
      t.string :answer
    end
  end
end
