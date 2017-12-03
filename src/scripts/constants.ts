export module Constants {
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
            Constants.TimeOfDay.DDK, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DDK, Constants.TimeOfDay.DAY, Constants.TimeOfDay.NHT, Constants.TimeOfDay.NHT,
            Constants.TimeOfDay.NHT, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY, Constants.TimeOfDay.DAY, Constants.TimeOfDay.DAY, Constants.TimeOfDay.NHT,
            Constants.TimeOfDay.NHT, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DDK, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.NHT, Constants.TimeOfDay.NHT,
            Constants.TimeOfDay.NON, Constants.TimeOfDay.DAY, Constants.TimeOfDay.DAY, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY,
            Constants.TimeOfDay.DDK, Constants.TimeOfDay.DAY, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY, Constants.TimeOfDay.NON, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DAY,
            Constants.TimeOfDay.DDK, Constants.TimeOfDay.DDK, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NHT, Constants.TimeOfDay.DDK, Constants.TimeOfDay.DDK, Constants.TimeOfDay.NON, Constants.TimeOfDay.NON
        ];
    }

    export module Battle {
        export module Characters {
            export module Opponent {
                export const name = "Boosie";
                export const emoji = "🐧🎢🏈☀️";
                export const evoStone = "Galladite";
                export const trainer = "Nadja";
            }

            export module Player {
                export const name = "Gotham";
                export const emoji = "{0}👽🎮😽";
                export const evoStone = "Absolite";
                export const trainer = "Margaret";
            }
        }

        export module DialogText {
            // Stage.BattleStart
            export const start = "{0} is {1} miles away."; // "[Defender] is [X] miles away."

            export module AttackReason {
                export const distanceClose = "{0} is {1} close{2}!"; // "[Defender] is [so/pretty] close!"
                export const distanceFar = "{0} is {1} far away..."; // "[Defender] is [so/pretty] far away..."
                export const evolutionEmoji = "{0} is reacting to the Internet!"; // "[Attacker] is reacting to the Internet!"
                export const evolutionMega = "{0}'s {1} is reacting to {2}'s Mega Ring!"; // "[Attacker]'s [EvolutionStone] is reacting to [AttackerTrainer]'s Mega Ring!"
                export const extraSleeping = "... and fast asleep";
                export const temperatureCold = Constants.Battle.Characters.Opponent.name + " looks a little cold..."; // "Boosie looks a little cold..."
                export const temperatureHot = Constants.Battle.Characters.Player.name + " looks {0}"; // "Gotham looks really warm!" / "Gotham looks super hot... ;)"

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

    export module Datastore {
        export const tableName = 'Location';
    }

    export module Ids {
        export const opponent = Classes.opponent;
        export const player = Classes.player;
        export const screen = "screen";
    }

    export module Numbers {
        export const bremertonLatitude = 47.5650;
        export const bremertonLongitude = -122.6270;
        export const metersToMilesFactor = 0.000621371;
        export const seattleLatitude = 47.6257;
        export const seattleLongitude = -122.3445;

        export const maxSoCloseInMiles = 5;
        export const maxPrettyCloseInMiles = 30;
        export const maxPrettyFarInMiles = 2000;

        export const playerEmojiDates = [
            [1, 1, "🎆"], [1, 15, "☔"], [2, 14, "❤️"], [3, 2, "💬"], [3, 6, "☔"],
            [3, 17, "🍀"], [3, 20, "🌸"], [4, 16, "🐰"], [5, 5, "💃🏾"], [5, 6, "🌺"],
            [6, 21, "🌞"], [8, 16, "2️⃣"], [9, 22, "🍂"], [10, 1, "🎃"], [11, 13, "🎁"],
            [11, 23, "🦃"], [12, 1, "🎄"], [12, 31, "🎆"]
        ];
    }

    export module Resources {
        export const twemojiCDN = "//twemoji.maxcdn.com/36x36/{0}.png";
        export const opponentPokemonGif = "assets/gallade_norm_front.gif";
        export const opponentMegaImg = "assets/nadja_drawing.jpg"
        export const opponentEmojiImg = "assets/emoji/emoji_n.png";
        export const playerPokemonGif = "assets/absol_shiny_back.gif";
        export const playerMegaImg = "assets/velma_dinkley.png";
        export const playerEmojiImg = "assets/emoji/emoji_m_{0}-{1}.png";
        export const arenaBackground = "assets/background.png";
    }

    export const unknownLocation = "<Unknown>";
}
