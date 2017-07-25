require 'test_helper'

class RoomsControllerTest < ActionDispatch::IntegrationTest
  test "#show with non-existent name returns 404" do
    assert_raise ActiveRecord::RecordNotFound do
      get room_path(name: "non-existent", format: :json)
    end
  end

  test "#show with valid name returns 200" do
    white_shadow = rooms(:white_shadow)

    get room_path(name: white_shadow.name, format: :json)

    assert_response :success
    assert_equal white_shadow.name, response_json[:name]
  end

  test "#create returns a new room with a unique name" do
    post rooms_path(format: :json)

    assert_response :success
    assert response_json[:name]
  end

  test "#create when name generator does not return new unique name raises" do
    white_shadow = rooms(:white_shadow)
    Haikunator.stubs(:haikunate).returns(white_shadow.name)

    assert_raises RoomsController::NameGeneratorError do
      post rooms_path
    end
  end
end
