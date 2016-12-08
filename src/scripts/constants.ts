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
            export const YPositions = [0, -199, -398, -597, -793, -989]; // TODO -793px is messed up
        }

        export module Tints {
            export const yellow = "linear-gradient(rgba(255, 255, 170, 0.25), rgba(255, 255, 170, 0.25))";
            export const orange = "linear-gradient(rgba(239, 165, 57, 0.25), rgba(239, 165, 57, 0.25))";
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
            // opponent
            export const opponent = "Boosie";
            export const opponentEvoStone = "Galladite";
            export const opponentTrainer = "Nadja";

            // player
            export const player = "Gotham";
            export const playerEvoStone = "Absolite";
            export const playerTrainer = "Margaret";
        }

        export module DialogText {
            // Stage.BattleStart
            export const start = Constants.Battle.Characters.opponent + " is {0} miles away.";

            // Stage.Attack
            export const attack = "{0} used {1}!";

            // Stage.AttackReason
            export const attackReasonDistanceClose = "{0} is {1} close!"; // "[Defender] is [so/pretty] close!"
            export const attackReasonDistanceFar = "{0} is {1} far away..."; // "[Defender] is [so/pretty] far away..."
            export const attackReasonEvolutionEmoji = "{0} is reacting to the Internet!"; // "[Attacker] is reacting to the Internet!"
            export const attackReasonEvolutionMega = "{0}'s {1} is reacting to {2}'s Mega Ring!"; // "[Attacker]'s [EvolutionStone] is reacting to [AttackerTrainer]'s Mega Ring!"
            export const attackReasonTemperatureCold = Constants.Battle.Characters.opponent + " looks a little cold..."; // "Boosie looks a little cold..."
            export const attackReasonTemperatureHot = Constants.Battle.Characters.player + " looks {0} hot{1}"; // "Gotham looks really hot!" / "Gotham looks super hot... ;)"
        }
    }

    export module Classes {
        export const arena = "arena";
        export const field = "field";
        export const opponent = "opponent";
        export const player = "player";
        export const scene = "scene";
        export const dialog = "dialog";
    }

    export module Ids {
        export const screen = "screen";
    }

    export module Numbers {
        export const kingstonLatitude = 47.7987;
        export const kingstonLongitude = -122.4982;
        export const seattleLatitude = 47.6062;
        export const seattleLongitude = -122.3321;
    }

    export module Resources {
        export const opponentPokemonGif = "src/sprites/gallade_norm_front.gif";
        export const playerPokemonGif = "src/sprites/absol_shiny_back.gif";
        export const arenaBackground = "src/sprites/background.png";
    }
}
