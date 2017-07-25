require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "#create starts a new game in a room" do
    white_shadow = rooms(:white_shadow)

    post games_path(name: white_shadow.name, format: :json)

    assert_response :success
  end

  test "#create requires a valid room" do
    assert_raises ActiveRecord::RecordNotFound do
      post games_path(name: "non-existent", format: :json)
    end
  end

  test "#update allows updating the game’s state" do
    white_shadow = rooms(:white_shadow)
    white_shadow_game = games(:white_shadow_game)
    new_state = "question2"

    assert_nil white_shadow_game.state

    put game_path(name: white_shadow.name, id: white_shadow_game.id, format: :json), params: {
      state: new_state
    }

    assert new_state, white_shadow_game.reload.state
  end

  test "#show retrieves a game" do
    white_shadow = rooms(:white_shadow)
    white_shadow_game = games(:white_shadow_game)

    get game_path(name: white_shadow.name, id: white_shadow_game.id, format: :json)

    assert_response :success
  end

  test "#show requires a valid game id" do
    white_shadow = rooms(:white_shadow)
    white_shadow_game = games(:white_shadow_game)

    assert_raises ActiveRecord::RecordNotFound do
      get game_path(name: white_shadow.name, id: white_shadow_game.id + 1, format: :json)
    end
  end

  test "#show requires a valid room name" do
    white_shadow_game = games(:white_shadow_game)

    assert_raises ActiveRecord::RecordNotFound do
      get game_path(name: "non-existent", id: white_shadow_game.id, format: :json)
    end
  end

  test "#show requires game to be in room" do
    twilight_hill = rooms(:twilight_hill)
    white_shadow_game = games(:white_shadow_game)

    assert_raises ActiveRecord::RecordNotFound do
      get game_path(name: twilight_hill.name, id: white_shadow_game.id, format: :json)
    end
  end
end
