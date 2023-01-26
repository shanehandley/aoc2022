import 'dart:async';
import 'package:aoc2022/utils.dart';

/// Given a String range pair of 'i-j', return a list of numbers from i to j
List<num> getSectionRange(String rangeItem) {
  var range = rangeItem.split('-').map(int.parse);

  var low = range.first;
  var high = range.last;

  return List.generate(high - low + 1, (index) => index + low);
}

Future<int> partone() async {
  List<String> lines = await loadInputLines("04");

  // Find the number of lines where either contains the other
  return lines.map((e) {
    var sections = e.split(',');

    var left = Set<num>.from(getSectionRange(sections[0]));
    var right = Set<num>.from(getSectionRange(sections[1]));

    return left.containsAll(right) || right.containsAll(left);
  }).fold<int>(0, (acc, current) => current == true ? acc + 1 : acc);
}

Future<int> parttwo() async {
  List<String> lines = await loadInputLines("04");

  // Find the number of lines which fully intersect
  return lines.map((e) {
    var sections = e.split(',');

    var left = Set<num>.from(getSectionRange(sections[0]));
    var right = Set<num>.from(getSectionRange(sections[1]));

    return left.intersection(right).isNotEmpty;
  }).fold<int>(0, (acc, current) => current == true ? acc + 1 : acc);
}
