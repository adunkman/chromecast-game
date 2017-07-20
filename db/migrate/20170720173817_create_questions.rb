class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string :prompt
      t.string :answer
      t.text :explanation
      t.timestamps
    end
  end
end
