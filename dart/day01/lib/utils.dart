import 'dart:async';
import 'dart:io';
import 'package:path/path.dart' as p;

Future<String> load(String day) async {
  String filePath = p.join(Directory.current.path, 'lib', "day$day.txt");

  return await File(filePath).readAsString();
}
