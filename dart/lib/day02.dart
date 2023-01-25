import 'dart:async';
import 'package:aoc2022/utils.dart';

enum Option { rock, scissors, paper }

enum Outcome { win, loss, draw }

// Map an outcome to the challenge to a choice, ie. (loss, rock) => C (scissors)
Map<Outcome, Map<Option, Option>> requiredResponse = {
  Outcome.win: {
    Option.rock: Option.paper,
    Option.paper: Option.scissors,
    Option.scissors: Option.rock,
  },
  Outcome.draw: {
    Option.rock: Option.rock,
    Option.paper: Option.paper,
    Option.scissors: Option.scissors,
  },
  Outcome.loss: {
    Option.rock: Option.scissors,
    Option.paper: Option.rock,
    Option.scissors: Option.paper,
  }
};

Map<Option, Map<Option, Outcome>> outcomes = {
  Option.rock: {
    Option.rock: Outcome.draw,
    Option.paper: Outcome.win,
    Option.scissors: Outcome.loss,
  },
  Option.paper: {
    Option.rock: Outcome.loss,
    Option.paper: Outcome.draw,
    Option.scissors: Outcome.win,
  },
  Option.scissors: {
    Option.rock: Outcome.win,
    Option.paper: Outcome.loss,
    Option.scissors: Outcome.draw,
  }
};

Map scores = {Option.rock: 1, Option.paper: 2, Option.scissors: 3};
Map bonus = {Outcome.win: 6, Outcome.draw: 3, Outcome.loss: 0};

class Game {
  late Option challenge;
  late Option response;

  Game(String choice) {
    List<String> values = choice.split(' ');

    challenge = _getChallenge(values[0]);
    response = _getResponse(values[1]);
  }

  int partOne() {
    Map<Option, Outcome> map = outcomes[challenge] as Map<Option, Outcome>;
    Outcome result = map[response] as Outcome;

    return scores[response] + bonus[result];
  }

  int partTwo() {
    // 'response' is now the desired 'outcome
    Outcome outcome = _getOutcome(response);

    // Find the response that matches the outcome
    Option choice = _getRequiredResponse(outcome, challenge);

    return scores[choice] + bonus[outcome];
  }

  Option _getChallenge(String input) {
    switch (input) {
      case 'A':
        return Option.rock;
      case 'B':
        return Option.paper;
      case 'C':
        return Option.scissors;
      default:
        throw Exception('$input is not a valid string value for Option');
    }
  }

  Option _getResponse(String input) {
    switch (input) {
      case 'X':
        return Option.rock;
      case 'Y':
        return Option.paper;
      case 'Z':
        return Option.scissors;
      default:
        throw Exception('$input is not a valid string value for Option');
    }
  }

  Outcome _getOutcome(Option input) {
    switch (input) {
      case Option.rock:
        return Outcome.loss;
      case Option.paper:
        return Outcome.draw;
      case Option.scissors:
        return Outcome.win;
      default:
        throw Exception('$input is not a valid string value for Outcome');
    }
  }

  Option _getRequiredResponse(Outcome outcome, Option challenge) {
    switch (outcome) {
      case Outcome.draw:
        Map<Option, Option> map =
            requiredResponse[Outcome.draw] as Map<Option, Option>;

        return map[challenge] as Option;
      case Outcome.loss:
        Map<Option, Option> map =
            requiredResponse[Outcome.loss] as Map<Option, Option>;

        return map[challenge] as Option;
      case Outcome.win:
        Map<Option, Option> map =
            requiredResponse[Outcome.win] as Map<Option, Option>;

        return map[challenge] as Option;
    }
  }
}

Future<int> partone() async {
  var data = await loadInput("02");

  return data
      .split('\n')
      .map((g) => Game(g).partOne())
      .reduce((prev, current) => prev + current);
}

Future<int> parttwo() async {
  var data = await loadInput("02");

  return data
      .split('\n')
      .map((g) => Game(g).partTwo())
      .reduce((prev, current) => prev + current);
}
