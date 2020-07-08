"use strict";
exports.__esModule = true;
var state_1 = require("./state");
var world = new state_1.Board();
world.updateMoves();
var bot = new state_1.AI(1);
var game = new state_1.BoardUX(Math.min(window.innerHeight, window.innerWidth), world, bot);
game.drawBoard();
window.onresize = function (e) {
    game.resize(Math.min(window.innerHeight, window.innerWidth));
    game.drawBoard();
};
// TODO ADD TWO-PLAYER MODE
function drawBoard(size, board) {
    var Pieces;
    (function (Pieces) {
        Pieces["wPawn"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png";
        Pieces["wKing"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png";
        Pieces["wRook"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png";
        Pieces["wBishop"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png";
        Pieces["wQueen"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png";
        Pieces["wKnight"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png";
        Pieces["bPawn"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png";
        Pieces["bKing"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png";
        Pieces["bRook"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png";
        Pieces["bBishop"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png";
        Pieces["bQueen"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png";
        Pieces["bKnight"] = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png";
    })(Pieces || (Pieces = {}));
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var p = board.getPiece(new state_1.Coordinate(i, j));
            if (p != null) {
                var url = void 0;
                switch (p.constructor) {
                    case state_1.Pawn:
                        if (p.getColor()) {
                            url = Pieces.wPawn;
                        }
                        else {
                            url = Pieces.bPawn;
                        }
                        break;
                    case state_1.King:
                        if (p.getColor()) {
                            url = Pieces.wKing;
                        }
                        else {
                            url = Pieces.bKing;
                        }
                        break;
                    case state_1.Rook:
                        if (p.getColor()) {
                            url = Pieces.wRook;
                        }
                        else {
                            url = Pieces.bRook;
                        }
                        break;
                    case state_1.Bishop:
                        if (p.getColor()) {
                            url = Pieces.wBishop;
                        }
                        else {
                            url = Pieces.bBishop;
                        }
                        break;
                    case state_1.Queen:
                        if (p.getColor()) {
                            url = Pieces.wQueen;
                        }
                        else {
                            url = Pieces.bQueen;
                        }
                        break;
                    case state_1.Knight:
                        if (p.getColor()) {
                            url = Pieces.wKnight;
                        }
                        else {
                            url = Pieces.bKnight;
                        }
                        break;
                    default:
                        break;
                }
                url = "http://" + url;
                var img = new Image();
                img.src = url.toString();
                // img.setAttribute("position", "fixed");
                // img.setAttribute("left", i * size / 8 + "px");
                // img.setAttribute("bottom", j * size / 8 + "px");
                // img.setAttribute("width", size / 8 + "px");
                // img.setAttribute("height", size / 8 + "px");
                img.setAttribute("style", "position: fixed; left: " + i * size / 8 + "px" + "; bottom: " + j * size / 8 + "px" + "; width: " + size / 8 + "px" + "; height:" + size / 8 + "px");
                document.body.appendChild(img);
            }
        }
    }
}
