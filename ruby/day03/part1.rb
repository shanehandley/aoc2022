#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day03.txt', __dir__)
input     = File.read(file_path)

priorities = input.each_line.reduce(0) do |sum, line|
  # split in half as two lists of chars
  first, second = line.each_char.each_slice(line.length / 2).to_a

  # Find the item type that appears in both compartments of each rucksack.
  # array intersections: x & y - there is only ever a single item so `.first`
  intersection = (first & second).first

  # Lowercase item types a through z have priorities 1 through 26.
  # Uppercase item types A through Z have priorities 27 through 52.

  # we need to know whether its upper or lowercase
  is_lowercase = intersection.downcase == intersection

  # If it is lowercase, we can get the char ord and remove 96 ('a'.ord == 97)
  # else we should remove 38 ('A'.ord == 65) to reset to 27
  subtraction_factor = is_lowercase ? 96 : 38

  sum + intersection.ord - subtraction_factor
end

puts priorities
