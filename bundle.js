(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var state_1 = require("./state");
var world = new state_1.Board();
world.updateMoves();
var bot = new state_1.AI(3);
var game = new state_1.BoardUX(931, world, bot);
game.drawBoard();
// for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {
//         let p: Piece = world.getPiece(new Coordinate(i, j));
//         if (p != null) {
//             p.getMoves().forEach((move: Coordinate) => {
//                 console.log(move);
//             });
//         }
//     }
// }
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

},{"./state":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Knight = exports.Queen = exports.Bishop = exports.King = exports.Rook = exports.Pawn = exports.Coordinate = exports.Board = exports.AI = exports.BoardUX = void 0;
var BoardUX = /** @class */ (function () {
    function BoardUX(size, gameState, bot) {
        this.size = size;
        if (gameState) {
            this.gameState = gameState;
        }
        else {
            this.gameState = new Board();
        }
        if (bot) {
            this.opponent = bot;
        }
        else {
            this.opponent = new AI(2);
        }
        this.registerListener();
    }
    BoardUX.prototype.drawBoard = function () {
        var boardDiv = document.getElementById("board");
        boardDiv.innerHTML = '<img src="http://images.chesscomfiles.com/chess-themes/boards/green/76.png" style="z-index: -1; position: fixed; left: 0; bottom: 0; height: 931px; margin: 0; padding: 0"/>';
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
                var p = this.gameState.getPiece(new Coordinate(i, j));
                if (p != null) {
                    var url = void 0;
                    switch (p.constructor) {
                        case Pawn:
                            if (p.getColor()) {
                                url = Pieces.wPawn;
                            }
                            else {
                                url = Pieces.bPawn;
                            }
                            break;
                        case King:
                            if (p.getColor()) {
                                url = Pieces.wKing;
                            }
                            else {
                                url = Pieces.bKing;
                            }
                            break;
                        case Rook:
                            if (p.getColor()) {
                                url = Pieces.wRook;
                            }
                            else {
                                url = Pieces.bRook;
                            }
                            break;
                        case Bishop:
                            if (p.getColor()) {
                                url = Pieces.wBishop;
                            }
                            else {
                                url = Pieces.bBishop;
                            }
                            break;
                        case Queen:
                            if (p.getColor()) {
                                url = Pieces.wQueen;
                            }
                            else {
                                url = Pieces.bQueen;
                            }
                            break;
                        case Knight:
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
                    img.setAttribute("style", "z-index: 1; position: fixed; left: " + i * this.size / 8 + "px" + "; bottom: " + j * this.size / 8 + "px" + "; width: " + this.size / 8 + "px" + "; height:" + this.size / 8 + "px");
                    boardDiv.appendChild(img);
                }
            }
        }
    };
    BoardUX.prototype.registerListener = function () {
        document.body.addEventListener("click", this.onClick.bind(this), false);
    };
    // Model-view-controller
    BoardUX.prototype.onClick = function (event) {
        var _this = this;
        document.getElementById("highlight").innerHTML = "";
        var x = Math.floor(8 * event.clientX / 931);
        var y = Math.floor(8 * (1 - (event.clientY / 931)));
        var pos = new Coordinate(x, y);
        if (!(this.selected == null) && pos.x == this.selected.x && pos.y == this.selected.y) {
            this.selected = null;
            return;
        }
        if (Math.min(7, Math.max(0, pos.x)) == pos.x && Math.min(7, Math.max(0, pos.y)) == pos.y && !this.gameState.hasMate(true) && !this.gameState.hasMate(false)) {
            var p = this.gameState.getPiece(pos);
            if (p != null && p.getColor()) {
                this.selected = pos;
                var highlight_1 = document.getElementById("highlight");
                var sqr = document.createElement("div");
                sqr.setAttribute("style", "z-index: 0; position: fixed; left:" + pos.x * this.size / 8 + "px; bottom: " + pos.y * this.size / 8 + "px; width: " + this.size / 8 + "px; height: " + this.size / 8 + "px");
                sqr.style.opacity = "0.5";
                sqr.style.backgroundColor = "yellow";
                highlight_1.appendChild(sqr);
                this.gameState.getPiece(this.selected).getMoves().forEach(function (move) {
                    var size = 38;
                    var hint = document.createElement("div");
                    hint.setAttribute("style", "z-index: 0; position: fixed; left: " + (move.x * _this.size / 8 + _this.size / 16 - size / 2) + "px; bottom: " + (move.y * _this.size / 8 + _this.size / 16 - size / 2) + "px; width: " + size + "px; height: " + size + "px");
                    hint.style.opacity = "0.2";
                    hint.style.backgroundColor = "black";
                    hint.style.borderRadius = "50%";
                    highlight_1.appendChild(hint);
                });
            }
            else if (this.selected != null && this.gameState.getPiece(this.selected) != null) {
                var hasMove_1 = false;
                this.gameState.getPiece(this.selected).getMoves().forEach(function (move) {
                    if (move.x == x && move.y == y)
                        hasMove_1 = true;
                });
                if (hasMove_1) {
                    this.gameState.setPiece(pos, this.gameState.getPiece(this.selected));
                    this.gameState.setPiece(this.selected, null);
                    this.gameState.getPiece(pos).setPosition(pos);
                    this.gameState.updateMoves();
                    this.drawBoard();
                    document.getElementById("highlight").innerHTML = "";
                    if (this.gameState.hasMate(false)) {
                        console.log("Checkmate!");
                    }
                    else {
                        this.opponentMove();
                    }
                }
                else {
                    this.selected = null;
                }
            }
        }
    };
    BoardUX.prototype.opponentMove = function () {
        this.opponent.makeMove(this.gameState);
        if (this.gameState.hasMate(true)) {
            console.log("Checkmate!");
        }
        this.drawBoard();
    };
    return BoardUX;
}());
exports.BoardUX = BoardUX;
var AI = /** @class */ (function () {
    function AI(depth) {
        this.depth = depth;
    }
    AI.prototype.evaluate = function (gameState) {
        var score = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var p = gameState.getPiece(new Coordinate(i, j));
                if (p == null)
                    continue;
                switch (p.constructor) {
                    case Pawn:
                        if (p.getColor()) {
                            score++;
                        }
                        else {
                            score--;
                        }
                        break;
                    case King:
                        if (p.getColor()) {
                            score += 100;
                        }
                        else {
                            score -= 100;
                        }
                        break;
                    case Rook:
                        if (p.getColor()) {
                            score += 5;
                        }
                        else {
                            score -= 5;
                        }
                        break;
                    case Bishop:
                        if (p.getColor()) {
                            score += 3;
                        }
                        else {
                            score -= 3;
                        }
                        break;
                    case Queen:
                        if (p.getColor()) {
                            score += 9;
                        }
                        else {
                            score -= 9;
                        }
                        break;
                    case Knight:
                        if (p.getColor()) {
                            score += 3;
                        }
                        else {
                            score -= 3;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        if (gameState.hasMate(true))
            score -= 1000;
        if (gameState.hasMate(false))
            score += 1000;
        return score;
    };
    AI.prototype.makeMove = function (gameState) {
        var maxMove;
        var current;
        var max;
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var p = gameState.getPiece(new Coordinate(i, j));
                if (p != null && !p.getColor()) {
                    p.moves.forEach(function (move) {
                        var mirror = gameState.copy();
                        mirror.setPiece(move, mirror.getPiece(new Coordinate(i, j)));
                        mirror.setPiece(new Coordinate(i, j), null);
                        mirror.getPiece(move).setPosition(move);
                        mirror.updateMoves();
                        var res = this.evaluate(mirror);
                        if (!max || -res > max) {
                            max = -res;
                            current = new Coordinate(i, j);
                            maxMove = move;
                        }
                    }.bind(this_1));
                }
            };
            for (var j = 0; j < 8; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < 8; i++) {
            _loop_1(i);
        }
        gameState.setPiece(maxMove, gameState.getPiece(current));
        gameState.setPiece(current, null);
        gameState.getPiece(maxMove).setPosition(maxMove);
        gameState.updateMoves();
    };
    return AI;
}());
exports.AI = AI;
var Board = /** @class */ (function () {
    function Board(initial) {
        if (initial != null) {
            this.state = initial;
        }
        else {
            this.state = [];
            // pawns
            for (var i = 0; i < 8; i++) {
                this.state[i] = [];
                for (var j = 0; j < 8; j++) {
                    this.state[i][j] = null;
                }
            }
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 8; j++) {
                    this.state[j][i == 0 ? 1 : 6] = new Pawn(new Coordinate(j, i == 0 ? 1 : 6), i == 0);
                }
            }
            // TODO: read from string
            // kings
            this.state[4][0] = new King(new Coordinate(4, 0), true);
            this.state[4][7] = new King(new Coordinate(4, 7), false);
            // rooks
            this.state[0][0] = new Rook(new Coordinate(0, 0), true);
            this.state[7][0] = new Rook(new Coordinate(7, 0), true);
            this.state[0][7] = new Rook(new Coordinate(0, 7), false);
            this.state[7][7] = new Rook(new Coordinate(7, 7), false);
            // bishops
            this.state[2][0] = new Bishop(new Coordinate(2, 0), true);
            this.state[5][0] = new Bishop(new Coordinate(5, 0), true);
            this.state[2][7] = new Bishop(new Coordinate(2, 7), false);
            this.state[5][7] = new Bishop(new Coordinate(5, 7), false);
            // queens
            this.state[3][0] = new Queen(new Coordinate(3, 0), true);
            this.state[3][7] = new Queen(new Coordinate(3, 7), false);
            // knights
            this.state[1][0] = new Knight(new Coordinate(1, 0), true);
            this.state[6][0] = new Knight(new Coordinate(6, 0), true);
            this.state[1][7] = new Knight(new Coordinate(1, 7), false);
            this.state[6][7] = new Knight(new Coordinate(6, 7), false);
        }
    }
    Board.prototype.copy = function () {
        var stateCopy = [];
        for (var i = 0; i < 8; i++) {
            stateCopy[i] = [];
            for (var j = 0; j < 8; j++) {
                if (this.state[i][j] != null)
                    stateCopy[i][j] = this.state[i][j].copy();
            }
        }
        return new Board(stateCopy);
    };
    Board.prototype.hasCheck = function (color) {
        var _this = this;
        var res = false;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.state[i][j] != null) {
                    this.state[i][j].updateMoves(this, true);
                    this.state[i][j].getMoves().forEach(function (move) {
                        if (_this.getPiece(move) != null && _this.getPiece(move).getColor() == color && _this.getPiece(move) instanceof King) {
                            res = true;
                        }
                    });
                }
            }
        }
        return res;
    };
    Board.prototype.hasMate = function (color) {
        var mirror = this.copy();
        var res = mirror.hasCheck(color);
        if (res) {
            mirror.updateMoves();
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    if (mirror.getPiece(new Coordinate(i, j)) != null && mirror.getPiece(new Coordinate(i, j)).getColor() == color && mirror.getPiece(new Coordinate(i, j)).getMoves().length > 0)
                        res = false;
                }
            }
        }
        return res;
    };
    Board.prototype.hasStalemate = function (color) {
        var mirror = this.copy();
        var res = !mirror.hasCheck(color);
        if (res) {
            mirror.updateMoves();
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    if (mirror.getPiece(new Coordinate(i, j)) != null && mirror.getPiece(new Coordinate(i, j)).getColor() == color && mirror.getPiece(new Coordinate(i, j)).getMoves().length > 0)
                        res = false;
                }
            }
        }
        return res;
    };
    Board.prototype.setPiece = function (position, piece) {
        this.state[position.x][position.y] = piece;
    };
    Board.prototype.getPiece = function (position) {
        return this.state[position.x][position.y];
    };
    Board.prototype.getState = function () {
        var stateCopy = [];
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                stateCopy[i][j] = this.state[i][j].copy(); // copy pieces, also
            }
        }
        return stateCopy;
    };
    Board.prototype.updateMoves = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (this.state[i][j] != null)
                    this.state[i][j].updateMoves(this, false);
            }
        }
    };
    return Board;
}());
exports.Board = Board;
var Coordinate = /** @class */ (function () {
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    Coordinate.prototype.plus = function (c) {
        return new Coordinate(c.x + this.x, c.y + this.y);
    };
    Coordinate.prototype.minus = function (c) {
        return new Coordinate(this.x - c.x, this.y - c.y);
    };
    Coordinate.prototype.print = function () {
        return "{" + this.x, +", " + this.y + "}";
    };
    return Coordinate;
}());
exports.Coordinate = Coordinate;
var Pawn = /** @class */ (function () {
    function Pawn(position, color) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }
    Pawn.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        // forward once
        var mirror = gameState.copy();
        var pos = this.position.plus(new Coordinate(0, this.color ? 1 : -1));
        if (mirror.getPiece(pos) == null) {
            mirror.setPiece(pos, new Pawn(pos, this.color));
            mirror.setPiece(this.position, null);
            if (ignoreChecks || !mirror.hasCheck(this.color)) {
                this.moves.push(pos);
            }
        }
        // forward twice
        if (this.color ? this.position.y == 1 : this.position.y == 6) {
            mirror = gameState.copy();
            pos = this.position.plus(new Coordinate(0, this.color ? 2 : -2));
            if (mirror.getPiece(pos) == null && mirror.getPiece(this.position.plus(new Coordinate(0, this.color ? 1 : -1))) == null) {
                mirror.setPiece(pos, new Pawn(pos, this.color));
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
        // left capture
        if ((this.color ? this.position.y < 7 : this.position.y > 1) && this.position.x > 0) {
            mirror = gameState.copy();
            pos = this.position.plus(new Coordinate(-1, this.color ? 1 : -1));
            var capture = mirror.getPiece(pos);
            if (capture != null && capture.color != this.color) {
                mirror.setPiece(pos, new Pawn(pos, this.color));
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
        // right capture
        if ((this.color ? this.position.y < 7 : this.position.y > 1) && this.position.x < 7) {
            mirror = gameState.copy();
            pos = this.position.plus(new Coordinate(1, this.color ? 1 : -1));
            var capture = mirror.getPiece(pos);
            if (capture != null && capture.color != this.color) {
                mirror.setPiece(pos, new Pawn(pos, this.color));
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
        // TODO: add en passant
    };
    Pawn.prototype.copy = function () {
        return new Pawn(this.position, this.color);
    };
    Pawn.prototype.getColor = function () {
        return this.color;
    };
    Pawn.prototype.getMoves = function () {
        return this.moves;
    };
    Pawn.prototype.setPosition = function (position) {
        this.position = position;
    };
    return Pawn;
}());
exports.Pawn = Pawn;
var Rook = /** @class */ (function () {
    function Rook(position, color) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }
    Rook.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        // "raycast" in each direction
        var cast = function (s, i, c, p, x, dir, m) {
            // TODO: fix this
            var cap = (x ? p.x : p.y);
            var coefficient = dir ? 1 : -1;
            if (dir)
                cap = 7 - cap;
            for (var i_1 = 1; i_1 <= cap; i_1++) {
                var pos = p.plus(new Coordinate(coefficient * (x ? i_1 : 0), coefficient * (x ? 0 : i_1)));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    var mirror = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
                if (gameState.getPiece(pos) != null)
                    break;
            }
        };
        // left
        cast(gameState, ignoreChecks, this.color, this.position, true, false, this.moves);
        // right
        cast(gameState, ignoreChecks, this.color, this.position, true, true, this.moves);
        // up
        cast(gameState, ignoreChecks, this.color, this.position, false, true, this.moves);
        // down
        cast(gameState, ignoreChecks, this.color, this.position, false, false, this.moves);
    };
    Rook.prototype.copy = function () {
        return new Rook(this.position, this.color);
    };
    Rook.prototype.getColor = function () {
        return this.color;
    };
    Rook.prototype.getMoves = function () {
        return this.moves;
    };
    Rook.prototype.setPosition = function (position) {
        this.position = position;
    };
    return Rook;
}());
exports.Rook = Rook;
var King = /** @class */ (function () {
    function King(position, color) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
        this.canCastle = true;
    }
    King.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        // move through 3x3 surrounding square and check all positions except current one (center)
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var bounds = this.position.x + i > -1 && this.position.x + i < 8 && this.position.y + j > -1 && this.position.y + j < 8;
                var pos = this.position.plus(new Coordinate(i, j));
                if ((i != 0 || j != 0) && bounds && (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != this.color)) {
                    var mirror = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(this.position));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(this.position, null);
                    if (ignoreChecks || !mirror.hasCheck(this.color)) {
                        this.moves.push(pos);
                    }
                }
            }
        }
        // add castling
    };
    King.prototype.copy = function () {
        var pos = new Coordinate(this.position.x, this.position.y);
        return new King(pos, this.color);
    };
    King.prototype.getColor = function () {
        return this.color;
    };
    King.prototype.getMoves = function () {
        return this.moves;
    };
    King.prototype.setPosition = function (position) {
        this.position = position;
    };
    return King;
}());
exports.King = King;
var Bishop = /** @class */ (function () {
    function Bishop(position, color) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }
    Bishop.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        // "raycast" in each direction
        var cast = function (s, i, c, p, xDir, yDir, m) {
            var capX = p.x;
            var capY = p.y;
            var c1 = xDir ? 1 : -1;
            var c2 = yDir ? 1 : -1;
            if (xDir)
                capX = 7 - capX;
            if (yDir)
                capY = 7 - capY;
            var cap = Math.min(capX, capY);
            for (var i_2 = 1; i_2 <= cap; i_2++) {
                var pos = p.plus(new Coordinate(c1 * i_2, c2 * i_2));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    var mirror = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
                if (gameState.getPiece(pos) != null)
                    break;
            }
        };
        // up/left
        cast(gameState, ignoreChecks, this.color, this.position, true, false, this.moves);
        // up/right
        cast(gameState, ignoreChecks, this.color, this.position, true, true, this.moves);
        // down/left
        cast(gameState, ignoreChecks, this.color, this.position, false, true, this.moves);
        // down/right
        cast(gameState, ignoreChecks, this.color, this.position, false, false, this.moves);
    };
    Bishop.prototype.copy = function () {
        return new Bishop(this.position, this.color);
    };
    Bishop.prototype.getColor = function () {
        return this.color;
    };
    Bishop.prototype.getMoves = function () {
        return this.moves;
    };
    Bishop.prototype.setPosition = function (position) {
        this.position = position;
    };
    return Bishop;
}());
exports.Bishop = Bishop;
var Queen = /** @class */ (function () {
    function Queen(position, color) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }
    Queen.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        // "raycast" in each direction
        var diacast = function (s, i, c, p, xDir, yDir, m) {
            var capX = p.x;
            var capY = p.y;
            var c1 = xDir ? 1 : -1;
            var c2 = yDir ? 1 : -1;
            if (xDir)
                capX = 7 - capX;
            if (yDir)
                capY = 7 - capY;
            var cap = Math.min(capX, capY);
            for (var i_3 = 1; i_3 <= cap; i_3++) {
                var pos = p.plus(new Coordinate(c1 * i_3, c2 * i_3));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    var mirror = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
                if (gameState.getPiece(pos) != null)
                    break;
            }
        };
        // up/left
        diacast(gameState, ignoreChecks, this.color, this.position, true, false, this.moves);
        // up/right
        diacast(gameState, ignoreChecks, this.color, this.position, true, true, this.moves);
        // down/left
        diacast(gameState, ignoreChecks, this.color, this.position, false, true, this.moves);
        // down/right
        diacast(gameState, ignoreChecks, this.color, this.position, false, false, this.moves);
        // "raycast" in each direction
        var cast = function (s, i, c, p, x, dir, m) {
            // TODO: fix this
            var cap = (x ? p.x : p.y);
            var coefficient = dir ? 1 : -1;
            if (dir)
                cap = 7 - cap;
            for (var i_4 = 1; i_4 <= cap; i_4++) {
                var pos = p.plus(new Coordinate(coefficient * (x ? i_4 : 0), coefficient * (x ? 0 : i_4)));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    var mirror = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
                if (gameState.getPiece(pos) != null)
                    break;
            }
        };
        // left
        cast(gameState, ignoreChecks, this.color, this.position, true, false, this.moves);
        // right
        cast(gameState, ignoreChecks, this.color, this.position, true, true, this.moves);
        // up
        cast(gameState, ignoreChecks, this.color, this.position, false, true, this.moves);
        // down
        cast(gameState, ignoreChecks, this.color, this.position, false, false, this.moves);
    };
    Queen.prototype.copy = function () {
        return new Queen(this.position, this.color);
    };
    Queen.prototype.getColor = function () {
        return this.color;
    };
    Queen.prototype.getMoves = function () {
        return this.moves;
    };
    Queen.prototype.setPosition = function (position) {
        this.position = position;
    };
    return Queen;
}());
exports.Queen = Queen;
var Knight = /** @class */ (function () {
    function Knight(position, color) {
        this.position = position;
        this.moves = [];
        this.color = color;
    }
    Knight.prototype.updateMoves = function (gameState, ignoreChecks) {
        this.moves = [];
        for (var i = 0; i < 8; i++) {
            var long = 2 * (i >= 4 ? 1 : -1);
            var short = i % 2 == 0 ? 1 : -1;
            var pos = this.position.plus(new Coordinate(i % 4 >= 2 ? long : short, i % 4 >= 2 ? short : long));
            if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8 && (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != this.getColor())) {
                var mirror = gameState.copy();
                mirror.setPiece(pos, mirror.getPiece(this.position));
                mirror.getPiece(pos).setPosition(pos);
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
    };
    Knight.prototype.copy = function () {
        return new Knight(this.position, this.color);
    };
    Knight.prototype.getColor = function () {
        return this.color;
    };
    Knight.prototype.getMoves = function () {
        return this.moves;
    };
    Knight.prototype.setPosition = function (position) {
        this.position = position;
    };
    return Knight;
}());
exports.Knight = Knight;

},{}]},{},[1]);
