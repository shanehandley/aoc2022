import 'dart:async';
import 'package:day01/utils.dart';

Future<int> partone() async {
  String data = await load("01");

  var groups = data
      .split('\n\n')
      .map((e) => e
          .split('\n')
          .map((e) => int.parse(e))
          .fold(0, (prev, element) => prev + element))
      .toList();

  groups.sort();

  return groups.last;
}
