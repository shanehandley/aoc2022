import 'dart:async';
import 'dart:io';
import 'package:aoc2022/generator.dart';

Future<String> loadInput(String day) async {
  return await File(Generator.inputPath(day)).readAsString();
}

Future<List<String>> loadInputLines(String day) async {
  var data = await File(Generator.inputPath(day)).readAsString();

  return data.split('\n');
}
