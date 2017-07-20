require 'test_helper'

class GamingSessionsControllerTest < ActionDispatch::IntegrationTest
  test "#update adds a player to a room" do
    ivy = players(:ivy)
    white_shadow = rooms(:white_shadow)

    put player_room_path(client_id: ivy.client_id, name: white_shadow.name)

    assert_response :success
  end

  test "#update requires a valid room" do
    ivy = players(:ivy)

    assert_raises ActiveRecord::RecordNotFound do
      put player_room_path(client_id: ivy.client_id, name: "not-a-room-name")
    end
  end

  test "#update requires a valid player" do
    white_shadow = rooms(:white_shadow)

    assert_raises ActiveRecord::RecordNotFound do
      put player_room_path(client_id: "cc3a8fdc-5659-44b5-8adf-a2919e811904", name: white_shadow.name)
    end
  end
end
