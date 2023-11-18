#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day03.txt', __dir__)
input     = File.read(file_path)

# From part one
def get_priority(item)
  is_lowercase = item.downcase == item

  is_lowercase ? item.ord - 96 : item.ord - 38
end

priorities = input.each_line.each_slice(3).reduce(0) do |sum, lines|
  # we are provided three lines, we want to find a common character in each line
  # convert it to three lists of chars and find the intersection
  first, second, third = lines.map(&:strip).map(&:chars)
  intersection = first & second & third

  sum + get_priority(intersection.first)
end

puts priorities
