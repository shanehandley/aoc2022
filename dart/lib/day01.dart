import 'dart:async';
import 'package:aoc2022/utils.dart';

Future<List<int>> sumGroups() async {
  String data = await loadInput("01");

  List<int> groups = data
      .split('\n\n')
      .map((e) => e
          .split('\n')
          .map(int.parse)
          .reduce((prev, element) => prev + element))
      .toList();

  groups.sort();

  return groups;
}

Future<int> partone() async {
  List<int> groups = await sumGroups();

  return groups.last;
}

Future<int> parttwo() async {
  List<int> groups = await sumGroups();

  return groups.reversed.take(3).reduce((value, element) => value + element);
}
