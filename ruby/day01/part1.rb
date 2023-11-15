#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day01.txt', __dir__)
input     = File.read(file_path)

puts input.split("\n\n").map { |entries| entries.split.map(&:to_i).sum }.max
