require 'test_helper'

class PlayersControllerTest < ActionDispatch::IntegrationTest
  test "#update requires a uuid passed" do
    assert_raises ActiveRecord::RecordInvalid do
      put player_path(client_id: "not-a-uuid")
    end
  end

  test "#update does not require a name" do
    client_id = "dcb745d1-5ff3-411e-a346-53077aa40b4d"

    put player_path(client_id: client_id)

    assert_response :success
    assert_equal client_id, response_json[:client_id]
    assert_nil response_json[:name]
  end

  test "#update can create a player with a name" do
    client_id = "e8da5396-bc70-4b9a-8ee3-e86dabf891ed"
    name = "Jay"

    put player_path(client_id: client_id, name: name)

    assert_response :success
    assert_equal client_id, response_json[:client_id]
    assert_equal name, response_json[:name]
  end

  test "#update can add a name to an existing player" do
    unknown = players(:unknown)
    name = "Chance"

    put player_path(client_id: unknown.client_id, name: name)

    assert_response :success
    assert_equal name, response_json[:name]
    assert_equal name, unknown.reload.name
  end

  test "#update can update a name of an existing player" do
    ivy = players(:ivy)
    new_name = "Charles"

    put player_path(client_id: ivy.client_id, name: new_name)

    assert_response :success
    assert_equal new_name, response_json[:name]
    assert_equal new_name, ivy.reload.name
  end
end
