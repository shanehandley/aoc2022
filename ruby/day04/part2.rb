#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day04.txt', __dir__)
input     = File.read(file_path)

# Part 1 looked at whether the ranges fully contained each other, but p2 wants to know if any parts
# overlap - ie the head or tail of the list exists in the other list
result = input.each_line.reduce(0) do |sum, line|
  # extract the line into two ranges
  left, right = line.strip.split(',')
                    .map { |entry| entry.split('-').map(&:to_i) }
                    .map { |entry| Range.new(*entry) }

  outcome =
    if (left.cover?(right.begin) || left.cover?(right.end)) ||
       (right.cover?(left.begin) || right.cover?(left.end))
      1
    else
      0
    end

  sum + outcome
end

puts result
