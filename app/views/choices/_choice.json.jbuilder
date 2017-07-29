json.(choice, :is_correct)
json.client_id choice.player.client_id
json.chosen_client_id choice.chosen_player.try(:client_id)
