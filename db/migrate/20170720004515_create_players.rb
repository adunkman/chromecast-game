class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.string :client_id
      t.string :name
      t.timestamps
    end
  end
end
