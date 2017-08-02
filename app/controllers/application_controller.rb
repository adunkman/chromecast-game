class ApplicationController < ActionController::Base
  before_action :set_client_id

  def set_client_id
    cookies[:client_id] = client_id
  end

  def client_id
    cookies[:client_id] || SecureRandom.uuid
  end
end
