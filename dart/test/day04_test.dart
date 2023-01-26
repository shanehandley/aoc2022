import 'package:aoc2022/day04.dart';
import 'package:test/test.dart';

void main() {
  test('getSectionRange simple', () {
    expect(getSectionRange('28-30'), [28, 29, 30]);
  });

  test('getSectionRange length', () {
    expect(getSectionRange('1-98').length, 98);
  });

  test('partone', () async {
    expect(await partone(), 513);
  });

  test('parttwo', () async {
    expect(await parttwo(), 878);
  });
}
