import 'dart:async';
import 'package:aoc2022/utils.dart';

/// Given a String range pair of 'i-j', return a list of numbers from i to j
Set<num> getSectionRange(String rangeItem) {
  var range = rangeItem.split('-').map(int.parse);

  var low = range.first;
  var high = range.last;

  return Set.from(List.generate(high - low + 1, (index) => index + low));
}

Future<int> partone() async {
  List<String> lines = await loadInputLines("04");

  // Find the number of lines where either contains the other
  return lines.fold<int>(0, (acc, current) {
    var sections = current.split(',');

    var left = getSectionRange(sections[0]);
    var right = getSectionRange(sections[1]);

    return left.containsAll(right) || right.containsAll(left) ? acc + 1 : acc;
  });
}

Future<int> parttwo() async {
  List<String> lines = await loadInputLines("04");

  // Find the number of lines which fully intersect
  return lines.fold<int>(0, (acc, current) {
    var sections = current.split(',');

    var left = getSectionRange(sections[0]);
    var right = getSectionRange(sections[1]);

    return left.intersection(right).isNotEmpty ? acc + 1 : acc;
  });
}
