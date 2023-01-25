import 'package:aoc2022/day01.dart';
import 'package:test/test.dart';

void main() {
  test('partone', () async {
    expect(await partone(), 69693);
  });

  test('parttwo', () async {
    expect(await parttwo(), 200945);
  });
}
