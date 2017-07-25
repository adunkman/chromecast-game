module ApplicationHelper
  def websocket_connect_url
    config = Rails.application.config_for(:websockets)
    "#{config["is_secure"] ? "wss" : "ws"}://#{config["host"]}/"
  end
end
