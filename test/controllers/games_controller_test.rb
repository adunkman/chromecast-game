require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "#create starts a new game in a room" do
    white_shadow = rooms(:white_shadow)

    post games_path(name: white_shadow.name)

    assert_response :success
  end

  test "#create requires a valid room" do
    assert_raises ActiveRecord::RecordNotFound do
      post games_path(name: "non-existent")
    end
  end
end
