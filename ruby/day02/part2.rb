#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day02.txt', __dir__)
input     = File.read(file_path)

scores = input.each_line.map do |line|
  play, outcome = line.split

  # the second column says how the round needs to end: X means you need to lose, Y means you need
  # to end the round in a draw, and Z means you need to win.

  # The index 0..2 of our desired outcome
  outcome_index = 'X' 'Y' 'Z'.index(outcome)

  # (0 if you lost, 3 if the round was a draw, and 6 if you won)
  outcome_score = outcome_index * 3

  response_index = 'A' 'B' 'C'.index(play)

  # The index of the response is 0-based, but we are exploiting the fact that the score we get for the
  # selection of (rock,scissors,paper) is just (1) + (the chosen items index)
  response_score = 1 + if outcome_index == 0 # we need to lose, return the the choice that preeceeds theirs
                     (response_index - 1) % 3
                   elsif outcome_index == 1 # draw, return their choice
                     response_index
                   else # win, return their choice + 1
                     (response_index + 1) % 3
                   end

  outcome_score + response_score
end

puts scores.sum
