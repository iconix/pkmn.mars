export module Constants {

    // '_' is a hack-y layer that packages all constants to be treated as an object.
    // Used for updating with custom constants from datastore.
    export module _ {
        export enum TimeOfDay {
            NON = 0, // None
            DAY = 1, // Day
            NHT = 2, // Night
            DDK = 3  // Dawn or Dusk
        }

        export module Background {
            export module SpritePositions {
                export const XPositions = [0, -255, -506, -758, -1009, -1261, -1514, -1766];
                export const YPositions = [0, -199, -398, -597, -796, -989];
            }

            export module Tints {
                export const yellow = "linear-gradient(rgba(255, 255, 170, 0.25), rgba(255, 255, 170, 0.25))";
                export const orange = "linear-gradient(rgba(238, 160, 43, 0.25), rgba(238, 160, 43, 0.25))";
                export const blue = "linear-gradient(rgba(120, 112, 192, 0.75), rgba(120, 112, 192, 0.75))";
            }

            // based on sprite positions in the Constants.Resources.arenaBackground
            export const timeOfDayMapping = [
                _.TimeOfDay.DDK, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.NHT, _.TimeOfDay.DDK, _.TimeOfDay.DAY, _.TimeOfDay.NHT, _.TimeOfDay.NHT,
                _.TimeOfDay.NHT, _.TimeOfDay.NHT, _.TimeOfDay.DAY, _.TimeOfDay.NHT, _.TimeOfDay.DAY, _.TimeOfDay.DAY, _.TimeOfDay.DAY, _.TimeOfDay.NHT,
                _.TimeOfDay.NHT, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.DDK, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.NHT, _.TimeOfDay.NHT,
                _.TimeOfDay.NON, _.TimeOfDay.DAY, _.TimeOfDay.DAY, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.DAY, _.TimeOfDay.NHT, _.TimeOfDay.DAY,
                _.TimeOfDay.DDK, _.TimeOfDay.DAY, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.DAY, _.TimeOfDay.NON, _.TimeOfDay.NHT, _.TimeOfDay.DAY,
                _.TimeOfDay.DDK, _.TimeOfDay.DDK, _.TimeOfDay.DDK, _.TimeOfDay.NHT, _.TimeOfDay.DDK, _.TimeOfDay.DDK, _.TimeOfDay.NON, _.TimeOfDay.NON
            ];
        }

        export module Battle {
            export module Characters {
                export module Opponent {
                    export const name = "Steelix";
                    export const emoji = "🤘🌟💔😏";
                    export const evoStone = "Steelixite";
                    export const trainer = "Brock";
                }

                export module Player {
                    export const name = "Pikachu";
                    export const emoji = "{0}⚡🎒💪";
                    export const evoStone = "Pikite";
                    export const trainer = "Ash";
                }
            }

            export module DialogText {
                // Stage.BattleStart
                export const start = "{0}'s {1} is {2} miles away."; // "[Trainer]'s [Defender] is [X] miles away."

                export module AttackReason {
                    export const distanceClose = "{0} is {1} close{2}!"; // "[Defender] is [so/pretty] close!"
                    export const distanceFar = "{0} is {1} far away..."; // "[Defender] is [so/pretty] far away..."
                    export const evolutionEmoji = "{0} is reacting to the Internet!"; // "[Attacker] is reacting to the Internet!"
                    export const evolutionMega = "{0}'s {1} is reacting to {2}'s Mega Ring!"; // "[Attacker]'s [EvolutionStone] is reacting to [AttackerTrainer]'s Mega Ring!"
                    export const extraSleeping = "... and fast asleep";
                    export const temperatureCold = "{0} looks a little cold..."; // "Steelix looks a little cold..."
                    export const temperatureHot = "{0} looks {1}"; // "Pikachu looks really warm!" / "Pikachu looks super hot... ;)"

                    export module Modifiers {
                        export const distanceExtreme = "so";
                        export const distanceModerate = "pretty";
                        export const hotness1 = "super hot... ;)";
                        export const hotness2 = "a little warm...";
                    }
                }

                // Stage.Attack
                export const attack = "{0} used {1}!";

                export module Result {
                    export const attackFell = "{0}'s attack fell!";
                    export const burned = "{0} is hurt by its burn!";
                    export const confused = "{0} is confused and hurt itself in its confusion!";
                    export const fainted = "{0} fainted!";
                    export const flinched = "{0} flinched!";
                    export const frozen = "{0} is frozen solid!";
                    export const harshSunlight = "The sunlight turned harsh!";
                    export const hpRestored = "{0}'s HP was restored.";
                    export const infatuated = "{0} fell in love!";
                    export const paralyzed = "{0} is paralyzed!";
                    export const speedFell = "{0}'s speed harshly fell!";
                    export const wokeUp = "{0} woke up!";
                }

                export module FinalDialog {
                    export const didGood = "{0} did some good!"; // "[Attacker] did some good!"
                    export const evolutionComplete = "{0} has {1}-evolved into {1} {0}!"; // "[Attacker] has [EvolutionType]-evolved into [EvolutionType] [Attacker]!"
                    export const meantWell = "{0} meant well..."; // "[Attacker] meant well..."
                    export const stillLiked = "... ...\n{0} still liked it!"; // "[Defender] still liked it!"
                }
            }
        }

        export module Classes {
            export const arena = "arena";
            export const dialogBox = "dialogBox";
            export const dialogText = "dialogText";
            export const field = "field";
            export const label = "label";
            export const opponent = "opponent";
            export const player = "player";
            export const scene = "scene";
        }

        export module Ids {
            export const opponent = Classes.opponent;
            export const player = Classes.player;
            export const screen = "screen";
        }

        export module Numbers {
            export const maxPrettyCloseInMiles = 30;
            export const maxPrettyFarInMiles = 2000;
            export const maxSoCloseInMiles = 5;
            export const metersToMilesFactor = 0.000621371;

            // opponent default: Tokyo
            export const opponentDefaultLatitude = 35.6895;
            export const opponentDefaultLongitude = 139.6917;
            // player default: Seattle
            export const playerDefaultLatitude = 47.6147;
            export const playerDefaultLongitude = -122.3448;

            // of the form: [<month>, <day>, <emoji>]
            export const playerEmojiDates = [
                [1, 1, "🎆"], [1, 15, "❄️"], [2, 14, "❤️"], [3, 1, "☔"],
                [3, 20, "🌸"], [4, 16, "🐰"], [5, 1, "🌺"],
                [6, 21, "🌞"], [9, 22, "🍂"], [10, 1, "🎃"],
                [11, 22, "🦃"], [12, 1, "🎄"], [12, 31, "🎆"]
            ];
        }

        export module Resources {
            export const opponentPokemonGif = "assets/steelix_front.gif";
            export const opponentMegaImg = "assets/steelix_mega.gif";
            export const playerPokemonGif = "assets/pikachu_back.gif";
            export const playerMegaImg = "assets/pikachu_megaman.gif";
            export const arenaBackground = "assets/background.png";
        }

        export const unknownLocation = "<Unknown>";
    }
}
