require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'mocha/mini_test'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def response_json
    ActiveSupport::HashWithIndifferentAccess.new ActiveSupport::JSON.decode response.body
  end
end
