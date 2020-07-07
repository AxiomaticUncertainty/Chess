export class BoardUX {
    public gameState: Board;
    size: number;
    selected: Coordinate;
    opponent: AI;

    constructor(size: number, gameState?: Board, bot?: AI) {
        this.size = size;
        if (gameState) {
            this.gameState = gameState;
        } else {
            this.gameState = new Board();
        }
        if (bot) {
            this.opponent = bot;
        } else {
            this.opponent = new AI(2);
        }
        this.registerListener();
    }

    drawBoard() {
        document.body.innerHTML = '<img src="http://images.chesscomfiles.com/chess-themes/boards/green/76.png" style="position: fixed; left: 0; bottom: 0; height: 931px; margin: 0; padding: 0"/>';
        enum Pieces {
            wPawn = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
            wKing = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
            wRook = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
            wBishop = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
            wQueen = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
            wKnight = "images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
            bPawn = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
            bKing = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
            bRook = "images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
            bBishop = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
            bQueen = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
            bKnight = "images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png"
        }
    
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let p: Piece = this.gameState.getPiece(new Coordinate(i, j));
                if (p != null) {
                    let url: String;
                    switch (p.constructor) {
                        case Pawn:
                            if (p.getColor()) {
                                url = Pieces.wPawn;
                            } else {
                                url = Pieces.bPawn;
                            }
                            break;
                        case King:
                            if (p.getColor()) {
                                url = Pieces.wKing;
                            } else {
                                url = Pieces.bKing;
                            }
                            break;
                        case Rook:
                            if (p.getColor()) {
                                url = Pieces.wRook;
                            } else {
                                url = Pieces.bRook;
                            }
                            break;
                        case Bishop:
                            if (p.getColor()) {
                                url = Pieces.wBishop;
                            } else {
                                url = Pieces.bBishop;
                            }
                            break;
                        case Queen:
                            if (p.getColor()) {
                                url = Pieces.wQueen;
                            } else {
                                url = Pieces.bQueen;
                            }
                            break;
                        case Knight:
                            if (p.getColor()) {
                                url = Pieces.wKnight;
                            } else {
                                url = Pieces.bKnight;
                            }
                            break;
                        default:
                            break;
                    }
                    url = "http://" + url;
                    let img: HTMLImageElement = new Image();
                    img.src = url.toString();
                    // img.setAttribute("position", "fixed");
                    // img.setAttribute("left", i * size / 8 + "px");
                    // img.setAttribute("bottom", j * size / 8 + "px");
                    // img.setAttribute("width", size / 8 + "px");
                    // img.setAttribute("height", size / 8 + "px");
                    img.setAttribute("style", "position: fixed; left: " + i * this.size / 8 + "px" + "; bottom: " + j * this.size / 8 + "px" + "; width: " + this.size / 8 + "px" + "; height:" + this.size / 8 + "px");
                    document.body.appendChild(img);
                }
            }
        }
    }
    
    registerListener() {
        document.body.addEventListener("click", this.onClick.bind(this), false);
    }

    // Model-view-controller
    onClick(event: MouseEvent) {
        let x = Math.floor(8 * event.clientX / 931);
        let y = Math.floor(8 * (1 - (event.clientY / 931)));
        let pos: Coordinate = new Coordinate(x, y);
        if (Math.min(7, Math.max(0, pos.x)) == pos.x && Math.min(7, Math.max(0, pos.y)) == pos.y && !this.gameState.hasMate(true) && !this.gameState.hasMate(false)) {
            let p: Piece = this.gameState.getPiece(pos);
            if (p != null && p.getColor()) {
                this.selected = pos;
            } else if (this.selected != null && this.gameState.getPiece(this.selected) != null) {
                let hasMove: boolean = false;
                this.gameState.getPiece(this.selected).getMoves().forEach(function (move: Coordinate) {
                    if (move.x == x && move.y == y) hasMove = true;
                });
                if (hasMove) {
                    this.gameState.setPiece(pos, this.gameState.getPiece(this.selected));
                    this.gameState.setPiece(this.selected, null);
                    this.gameState.getPiece(pos).setPosition(pos);
                    this.gameState.updateMoves();
                    this.drawBoard();
                    if (this.gameState.hasMate(false)) {
                        console.log("Checkmate!");
                    } else {
                        this.opponentMove();
                    }
                }
            }
        }
    }

    opponentMove() {
        this.opponent.makeMove(this.gameState);
        if (this.gameState.hasMate(true)) {
            console.log("Checkmate!");
        }
        this.drawBoard();
    }
}

export class AI {
    depth: number;

    constructor(depth: number) {
        this.depth = depth;
    }

    evaluate(gameState: Board) {
        let score: number = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let p: Piece = gameState.getPiece(new Coordinate(i, j));
                if (p == null) continue;
                switch (p.constructor) {
                    case Pawn:
                        if (p.getColor()) {
                            score++;
                        } else {
                            score--;
                        }
                        break;
                    case King:
                        if (p.getColor()) {
                            score += 100;
                        } else {
                            score -= 100;
                        }
                        break;
                    case Rook:
                        if (p.getColor()) {
                            score += 5;
                        } else {
                            score -= 5;
                        }
                        break;
                    case Bishop:
                        if (p.getColor()) {
                            score += 3;
                        } else {
                            score -= 3;
                        }
                        break;
                    case Queen:
                        if (p.getColor()) {
                            score += 9;
                        } else {
                            score -= 9;
                        }
                        break;
                    case Knight:
                        if (p.getColor()) {
                            score += 3;
                        } else {
                            score -= 3;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        if (gameState.hasMate(true)) score -= 1000;
        if (gameState.hasMate(false)) score += 1000;
        return score;
    }

    makeMove(gameState: Board) {
        let maxMove: Coordinate;
        let current: Coordinate;
        let max: number;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let p: Piece = gameState.getPiece(new Coordinate(i, j));
                if (p != null && !p.getColor()) {
                    p.moves.forEach(function (move: Coordinate) {
                        let mirror: Board = gameState.copy();
                        mirror.setPiece(move, mirror.getPiece(new Coordinate(i, j)));
                        mirror.setPiece(new Coordinate(i, j), null);
                        mirror.getPiece(move).setPosition(move);
                        mirror.updateMoves();
                        
                        let res: number = this.evaluate(mirror);
                        if (!max || -res > max) {
                            max = -res;
                            current = new Coordinate(i, j);
                            maxMove = move;
                        }
                    }.bind(this));
                }
            }
        }
        gameState.setPiece(maxMove, gameState.getPiece(current));
        gameState.setPiece(current, null);
        gameState.getPiece(maxMove).setPosition(maxMove);
        gameState.updateMoves();
    }
}

export class Board {
    private state: Piece[][]; // A1 = 0,0; H8 = 7,7;
    
    constructor(initial?: Piece[][]) {
        if (initial != null) {
            this.state = initial;
        } else {
            this.state = [];
            // pawns
            for (let i = 0; i < 8; i++) {
                this.state[i] = [];
                for (let j = 0; j < 8; j++) {
                    this.state[i][j] = null;
                }
            }
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    this.state[j][i == 0 ? 1 : 6] = new Pawn(new Coordinate(j, i == 0 ? 1 : 6), i == 0) as Piece;
                }
            }
            // TODO: read from string

            // kings
            this.state[4][0] = new King(new Coordinate(4, 0), true) as Piece;
            this.state[4][7] = new King(new Coordinate(4, 7), false) as Piece;
            
            // rooks
            this.state[0][0] = new Rook(new Coordinate(0, 0), true) as Piece;
            this.state[7][0] = new Rook(new Coordinate(7, 0), true) as Piece;
            this.state[0][7] = new Rook(new Coordinate(0, 7), false) as Piece;
            this.state[7][7] = new Rook(new Coordinate(7, 7), false) as Piece;

            // bishops
            this.state[2][0] = new Bishop(new Coordinate(2, 0), true) as Piece;
            this.state[5][0] = new Bishop(new Coordinate(5, 0), true) as Piece;
            this.state[2][7] = new Bishop(new Coordinate(2, 7), false) as Piece;
            this.state[5][7] = new Bishop(new Coordinate(5, 7), false) as Piece;

            // queens
            this.state[3][0] = new Queen(new Coordinate(3, 0), true) as Piece;
            this.state[3][7] = new Queen(new Coordinate(3, 7), false) as Piece;

            // knights
            this.state[1][0] = new Knight(new Coordinate(1, 0), true) as Piece;
            this.state[6][0] = new Knight(new Coordinate(6, 0), true) as Piece;
            this.state[1][7] = new Knight(new Coordinate(1, 7), false) as Piece;
            this.state[6][7] = new Knight(new Coordinate(6, 7), false) as Piece;
        }
    }

    copy() {
        let stateCopy: Piece[][] = [];
        for (let i = 0; i < 8; i++) {
            stateCopy[i] = [];
            for (let j = 0; j < 8; j++) {
                if (this.state[i][j] != null) stateCopy[i][j] = this.state[i][j].copy();
            }
        }
        return new Board(stateCopy);
    }

    hasCheck(color: boolean) {
        let res: boolean = false;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.state[i][j] != null) {
                    this.state[i][j].updateMoves(this, true);
                    this.state[i][j].getMoves().forEach((move: Coordinate) => {
                        if (this.getPiece(move) != null && this.getPiece(move).getColor() == color && this.getPiece(move) instanceof King) {
                            res = true;
                        }
                    });
                }
            }
        }
        return res;
    }

    hasMate(color: boolean) {
        let mirror: Board = this.copy();
        let res: boolean = mirror.hasCheck(color);
        if (res) {
            mirror.updateMoves();
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (mirror.getPiece(new Coordinate(i, j)) != null && mirror.getPiece(new Coordinate(i, j)).getColor() == color && mirror.getPiece(new Coordinate(i, j)).getMoves().length > 0) res = false;
                }
            }
        }
        return res;
    }

    hasStalemate(color: boolean) {
        let mirror: Board = this.copy();
        let res: boolean = !mirror.hasCheck(color);
        if (res) {
            mirror.updateMoves();
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (mirror.getPiece(new Coordinate(i, j)) != null && mirror.getPiece(new Coordinate(i, j)).getColor() == color && mirror.getPiece(new Coordinate(i, j)).getMoves().length > 0) res = false;
                }
            }
        }
        return res;
    }

    setPiece(position: Coordinate, piece: Piece) {
        this.state[position.x][position.y] = piece;
    }
    
    getPiece(position: Coordinate) {
        return this.state[position.x][position.y];
    }

    getState() {
        let stateCopy: Piece[][] = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                stateCopy[i][j] = this.state[i][j].copy(); // copy pieces, also
            }
        }
        return stateCopy;
    }

    updateMoves() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.state[i][j] != null) this.state[i][j].updateMoves(this, false);
            }
        }
    }
}

export class Coordinate {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    plus(c: Coordinate) {
        return new Coordinate(c.x + this.x, c.y + this.y);
    }

    minus(c: Coordinate) {
        return new Coordinate(this.x - c.x, this.y - c.y);
    }

    print() {
        return "{" + this.x, + ", " + this.y + "}";
    }
}

export interface Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE

    updateMoves(gameState: Board, ignoreChecks: boolean): void;

    copy(): Piece;

    getColor(): boolean;

    getMoves(): Coordinate[];

    setPosition(position: Coordinate): void;
}

export class Pawn implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];

        // forward once
        let mirror: Board = gameState.copy();
        let pos: Coordinate = this.position.plus(new Coordinate(0, this.color ? 1 : -1));
        if (mirror.getPiece(pos) == null) {
            mirror.setPiece(pos, new Pawn(pos, this.color) as Piece);
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
                mirror.setPiece(pos, new Pawn(pos, this.color) as Piece);
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
            let capture: Piece = mirror.getPiece(pos);
            if (capture != null && capture.color != this.color) {
                mirror.setPiece(pos, new Pawn(pos, this.color) as Piece);
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
            let capture: Piece = mirror.getPiece(pos);
            if (capture != null && capture.color != this.color) {
                mirror.setPiece(pos, new Pawn(pos, this.color) as Piece);
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
        // TODO: add en passant
    }

    copy() {
        return new Pawn(this.position, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
    // promote to queen under some circumstances
}

export class Rook implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];

        // "raycast" in each direction
        let cast = function(s: Board, i: boolean, c: boolean, p: Coordinate, x: boolean, dir: boolean, m: Coordinate[]) {
            // TODO: fix this
            let cap = (x ? p.x : p.y);
            let coefficient = dir ? 1 : -1;
            if (dir) cap = 7 - cap;
            for (let i = 1; i <= cap; i++) {
                let pos: Coordinate = p.plus(new Coordinate(coefficient * (x ? i : 0), coefficient * (x ? 0 : i)));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    let mirror: Board = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
    
                if (gameState.getPiece(pos) != null) break;
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
    }

    copy() {
        return new Rook(this.position, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
}

export class King implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE
    canCastle: boolean;

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
        this.canCastle = true;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];
        // move through 3x3 surrounding square and check all positions except current one (center)
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let bounds: boolean = this.position.x + i > -1 && this.position.x + i < 8 && this.position.y + j > -1 && this.position.y + j < 8;
                let pos = this.position.plus(new Coordinate(i, j));
                if ((i != 0 || j != 0) && bounds && (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != this.color)) {
                    let mirror = gameState.copy();
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
    }

    copy(): Piece {
        let pos: Coordinate = new Coordinate(this.position.x, this.position.y);
        return new King(pos, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
}

export class Bishop implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];

        // "raycast" in each direction
        let cast = function(s: Board, i: boolean, c: boolean, p: Coordinate, xDir: boolean, yDir: boolean, m: Coordinate[]) {
            let capX: number = p.x;
            let capY: number = p.y;
            let c1 = xDir ? 1 : -1;
            let c2 = yDir ? 1 : -1;
            if (xDir) capX = 7 - capX;
            if (yDir) capY = 7 - capY;
            let cap: number = Math.min(capX, capY);
            
            for (let i = 1; i <= cap; i++) {
                let pos: Coordinate = p.plus(new Coordinate(c1 * i, c2 * i));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    let mirror: Board = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
    
                if (gameState.getPiece(pos) != null) break;
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
    }

    copy() {
        return new Bishop(this.position, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
}

export class Queen implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean; // white = TRUE, black = FALSE

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        // TODO: add this.moves
        this.moves = [];
        this.color = color;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];

        // "raycast" in each direction
        let diacast = function(s: Board, i: boolean, c: boolean, p: Coordinate, xDir: boolean, yDir: boolean, m: Coordinate[]) {
            let capX: number = p.x;
            let capY: number = p.y;
            let c1 = xDir ? 1 : -1;
            let c2 = yDir ? 1 : -1;
            if (xDir) capX = 7 - capX;
            if (yDir) capY = 7 - capY;
            let cap: number = Math.min(capX, capY);
            
            for (let i = 1; i <= cap; i++) {
                let pos: Coordinate = p.plus(new Coordinate(c1 * i, c2 * i));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    let mirror: Board = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
    
                if (gameState.getPiece(pos) != null) break;
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
        let cast = function(s: Board, i: boolean, c: boolean, p: Coordinate, x: boolean, dir: boolean, m: Coordinate[]) {
            // TODO: fix this
            let cap = (x ? p.x : p.y);
            let coefficient = dir ? 1 : -1;
            if (dir) cap = 7 - cap;
            for (let i = 1; i <= cap; i++) {
                let pos: Coordinate = p.plus(new Coordinate(coefficient * (x ? i : 0), coefficient * (x ? 0 : i)));
                if (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != c) {
                    let mirror: Board = gameState.copy();
                    mirror.setPiece(pos, mirror.getPiece(p));
                    mirror.getPiece(pos).setPosition(pos);
                    mirror.setPiece(p, null);
                    if (ignoreChecks || !mirror.hasCheck(c)) {
                        m.push(pos);
                    }
                }
    
                if (gameState.getPiece(pos) != null) break;
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
    }

    copy() {
        return new Queen(this.position, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
}

export class Knight implements Piece {
    position: Coordinate;
    moves: Coordinate[];
    color: boolean;

    constructor(position: Coordinate, color: boolean) {
        this.position = position;
        this.moves = [];
        this.color = color;
    }

    updateMoves(gameState: Board, ignoreChecks: boolean) {
        this.moves = [];
        for (let i = 0; i < 8; i++) {
            let long = 2 * (i >= 4 ? 1 : -1);
            let short = i % 2 == 0 ? 1 : -1;
            let pos: Coordinate = this.position.plus(new Coordinate(i % 4 >= 2 ? long : short, i % 4 >= 2 ? short : long));
            if (pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8 && (gameState.getPiece(pos) == null || gameState.getPiece(pos).getColor() != this.getColor())) {
                let mirror: Board = gameState.copy();
                mirror.setPiece(pos, mirror.getPiece(this.position));
                mirror.getPiece(pos).setPosition(pos);
                mirror.setPiece(this.position, null);
                if (ignoreChecks || !mirror.hasCheck(this.color)) {
                    this.moves.push(pos);
                }
            }
        }
    }

    copy() {
        return new Knight(this.position, this.color) as Piece;
    }

    getColor() {
        return this.color;
    }

    getMoves() {
        return this.moves;
    }

    setPosition(position: Coordinate) {
        this.position = position;
    }
}