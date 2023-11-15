#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day02.txt', __dir__)
input     = File.read(file_path)

scores = input.each_line.map do |line|
  play, response = line.split

  # The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper,
  # and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round
  # was a draw, and 6 if you won).

  # The score we get for win/loss/draw - default to draw
  outcome_score = 0

  # We know that if we have the same index it is a draw, and if we have their index + 1 we win
  play_index = 'A' 'B' 'C'.index(play)
  response_index = 'X' 'Y' 'Z'.index(response)

  if play_index == response_index
    # draw
    outcome_score = 3
  elsif (play_index + 1) % 3 == response_index
    # win
    outcome_score = 6
  end

  # The game result + the index of our selection (+1 due to it being 0 based)
  outcome_score + response_index + 1
end

puts scores.sum
