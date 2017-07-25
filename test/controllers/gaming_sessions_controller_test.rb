require 'test_helper'

class GamingSessionsControllerTest < ActionDispatch::IntegrationTest
  test "#update adds a player to a room" do
    ivy = players(:ivy)
    white_shadow = rooms(:white_shadow)

    put player_room_path(client_id: ivy.client_id, name: white_shadow.name, format: :json)

    assert_response :success
  end

  test "#update requires a valid room" do
    ivy = players(:ivy)

    assert_raises ActiveRecord::RecordNotFound do
      put player_room_path(client_id: ivy.client_id, name: "not-a-room-name", format: :json)
    end
  end

  test "#update creates a player if it doesn’t exist" do
    white_shadow = rooms(:white_shadow)
    client_id = "cc3a8fdc-5659-44b5-8adf-a2919e811904"

    refute Player.exists?(client_id: client_id)

    put player_room_path(client_id: client_id, name: white_shadow.name, format: :json)

    assert Player.exists?(client_id: client_id)
  end
end
