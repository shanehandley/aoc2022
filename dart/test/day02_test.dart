import 'package:aoc2022/day02.dart';
import 'package:test/test.dart';

void main() {
  test('partone', () async {
    expect(await partone(), 12645);
  });

  test('parttwo', () async {
    expect(await parttwo(), 11756);
  });
}
