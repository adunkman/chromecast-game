module NotificationConcern
  extend ActiveSupport::Concern

  included do
    def notify_room_of_games
      HTTParty.post("#{websocket_endpoint}/rooms/#{@room.name}", {
        headers: { "Content-Type": "application/json" },
        body: {
          type: :games,
          data: JSON.parse(render_to_string("games/index"))
        }.to_json
      })
    end

    def notify_player_rooms_of_players
      @player.rooms.each do |room|
        send_players_notification(room)
      end
    end

    def notify_room_of_players
      send_players_notification(@room)
    end

    def send_players_notification(room)
      HTTParty.post("#{websocket_endpoint}/rooms/#{room.name}", {
        headers: { "Content-Type": "application/json" },
        body: { type: :players, data: room.players }.to_json
      })
    end

    def websocket_endpoint
      config = Rails.application.config_for(:websockets)
      "#{config["is_secure"] ? "https" : "http"}://#{config["host"]}"
    end
  end
end
