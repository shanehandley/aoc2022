import 'dart:async';
import 'package:aoc2022/utils.dart';
import 'package:collection/collection.dart';

// Build a list of lowercase + uppercase letters as our scoring reference
// i.e the score of a char is indexOf(char) + 1 (since it is 0-indexed)
List<String> chars =
    List.generate(26, (index) => String.fromCharCode(index + 97))
      ..addAll(List.generate(26, (index) => String.fromCharCode(index + 65)));

Future<int> partone() async {
  var lines = await loadInputLines("03");

  var duplicates = lines.map((line) {
    // Split into 2 groups
    Set<String> sectionone =
        Set.from(line.substring(0, line.length ~/ 2).split(''));
    Set<String> sectiontwo =
        Set.from(line.substring(line.length ~/ 2, line.length).split(''));

    // Find the intersection
    Set<String> unique = sectionone.intersection(sectiontwo);

    // Score entries based on their char index in 'chars'
    return unique.fold(0, (acc, current) => acc + chars.indexOf(current) + 1);
  });

  return duplicates.reduce((value, element) => value + element);
}

Future<int> parttwo() async {
  var lines = await loadInputLines("03");

  // Segment the data into groups of three then find their unique item
  var itemPriorities = lines.slices(3).map((group) {
    var items = group.map((e) => Set<String>.from(e.split('')));

    // Take the intersection of (1 and 2) and 3
    Set<String> firstTwo = items.first.intersection(items.elementAt(1));
    Set<String> unique = firstTwo.intersection(items.last);

    // Score entries based on their char index in 'chars'
    return unique.fold(0, (acc, current) => acc + chars.indexOf(current) + 1);
  });

  return itemPriorities.reduce((value, element) => value + element);
}
