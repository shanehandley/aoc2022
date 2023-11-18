#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day04.txt', __dir__)
input     = File.read(file_path)

# ...In how many assignment pairs does one range fully contain the other?
# another reduce over lines, incrementing when there is a range overlap for the line
# ruby ranges have a method for this: (1..10).cover?(5..10) # => true
result = input.each_line.reduce(0) do |sum, line|
  # extract the line into two ranges
  left, right = line.strip.split(',')
                    .map { |entry| entry.split('-').map(&:to_i) }
                    .map { |entry| Range.new(*entry) }

  outcome = left.cover?(right) || right.cover?(left) ? 1 : 0

  sum + outcome
end

puts result
