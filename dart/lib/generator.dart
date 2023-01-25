import 'dart:async';
import 'dart:io';
import 'package:path/path.dart' as p;

const String year = "2022";

enum TemplateType {
  bin,
  lib,
  test,
}

/// Generates file assets for a new AOC day
class Generator {
  final String _day;

  Generator(this._day);

  static String inputPath(String day) {
    return p.join(Directory.current.path, 'input', "day$day.txt");
  }

  String _solutionPath() {
    return p.join(Directory.current.path, 'lib', "day$_day.dart");
  }

  String _templatePath(String day, TemplateType template) {
    return p.join(Directory.current.path, 'templates', "${template.name}.txt");
  }

  String _outputPath(TemplateType template) {
    switch (template) {
      case TemplateType.bin:
        return p.join(Directory.current.path, 'bin', "day$_day.dart");
      case TemplateType.lib:
        return _solutionPath();
      case TemplateType.test:
        return p.join(Directory.current.path, 'test', "day${_day}_test.dart");
    }
  }

  Future<bool> generate() async {
    if (await File(inputPath(_day)).exists()) {
      throw Exception(
          "Input exists for day $_day at ${inputPath(_day)}. Exiting.");
    }

    if (await File(_solutionPath()).exists()) {
      throw Exception(
          "Code exists for day $_day at ${_solutionPath()}. Exiting");
    }

    // Create an empty input file
    File(inputPath(_day)).create();

    // Templated file
    var promises = TemplateType.values.map((template) async {
      var libTemplate = File(_templatePath(_day, template));
      var lines = await libTemplate.readAsString();

      await File(_outputPath(template))
          .writeAsString(lines.replaceAll('__DAY__', _day));

      return _outputPath(template);
    });

    await Future.wait(promises).then((paths) =>
        {for (var path in paths) print("Generated ${p.relative(path)}")});

    print(
        // parse the day to an int => the url format does not use trailing zeroes
        "\nHappy coding, input: https://adventofcode.com/$year/day/${int.parse(_day)}/input");

    return true;
  }
}
