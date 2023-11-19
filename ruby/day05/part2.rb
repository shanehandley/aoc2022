#!/usr/bin/env ruby

file_path = File.expand_path('../../inputs/day05.txt', __dir__)
input     = File.read(file_path)

# The initial state is computed the same as part 1
initial_state_diagram = input.lines.slice(0, 8).map { |line| line.split("\n") }.flatten

rows = []

initial_state_diagram.each_with_index.map do |row, row_index|
  # create a new row
  rows.push(Array.new(9))

  # each column is 3 chars wide (+ a space) so inspect in 4 char chunks and append the item
  # to our new row if it begins with "["
  row.chars.each_slice(4).with_index.map do |chars, slice_index|
    rows[row_index][slice_index] = chars[1] if chars.first == '['
  end
end

# Now a quick transposition to make it more manageable as a list of stacks
stacks = rows.transpose.map(&:compact)

# The difference in part 2 is that we adjust how the crates are moved - they are not reversed
input.lines.drop(10).each_entry do |op|
    amount, source, destination = op.scan(/move (\d+).*(\d+).*(\d+)/).flatten.map(&:to_i)
  
    # pull the containers from the source
    containers = stacks[source - 1].shift(amount)
  
    # prepend them to destination - this time we don't need to reverse them
    stacks[destination - 1].unshift(*containers)
  end
  
  # List each container on the top
  puts stacks.map(&:first).join
  
  # GCFGLDNJZ
  