# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170728224122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "question_id"
    t.bigint "gaming_session_id"
    t.string "answer"
    t.index ["game_id"], name: "index_answers_on_game_id"
    t.index ["gaming_session_id"], name: "index_answers_on_gaming_session_id"
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state"
    t.index ["room_id"], name: "index_games_on_room_id"
  end

  create_table "games_questions", force: :cascade do |t|
    t.bigint "game_id"
    t.bigint "question_id"
    t.index ["game_id"], name: "index_games_questions_on_game_id"
    t.index ["question_id"], name: "index_games_questions_on_question_id"
  end

  create_table "gaming_sessions", force: :cascade do |t|
    t.bigint "room_id"
    t.bigint "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "score"
    t.index ["player_id"], name: "index_gaming_sessions_on_player_id"
    t.index ["room_id", "player_id"], name: "index_gaming_sessions_on_room_id_and_player_id", unique: true
    t.index ["room_id"], name: "index_gaming_sessions_on_room_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "client_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "prompt"
    t.string "answer"
    t.text "explanation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
