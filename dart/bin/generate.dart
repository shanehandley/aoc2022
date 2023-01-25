import 'dart:io';
import 'package:aoc2022/generator.dart';
import 'package:args/args.dart';

void main(List<String> args) async {
  final ArgParser parser = ArgParser()..addOption('day', abbr: 'd');

  ArgResults result = parser.parse(args);

  if (result.arguments.isEmpty) {
    print("Error: Required option `day` not provided");
    print("use dart run bin/generate.dart {day}");

    exit(1);
  }

  int dayAsInteger = int.parse(result.arguments.first);

  // Ensure the day is sane
  if (dayAsInteger.isNegative || dayAsInteger < 1 || dayAsInteger > 30) {
    print("Error: `day` must be in the range 1-30");

    exit(1);
  }

  String day = result.arguments.first;

  // 2, 3, ... => 02, 03, ...
  if (dayAsInteger <= 10 && !result.arguments.first.startsWith("0")) {
    day = "0$day";
  }

  await Generator(day).generate();
}
