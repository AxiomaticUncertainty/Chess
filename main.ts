import { Board, Piece, King, Pawn, Rook, Bishop, Queen, Knight, Coordinate, BoardUX, AI } from "./state";

let world: Board = new Board();
world.updateMoves();
let bot: AI = new AI(1);
let game: BoardUX = new BoardUX(Math.min(window.innerHeight, window.innerWidth), world, bot);
game.drawBoard();

window.onresize = (e: Event) => {
    game.resize(Math.min(window.innerHeight, window.innerWidth));
    game.drawBoard();
}
// TODO ADD TWO-PLAYER MODE

function drawBoard(size: number, board: Board) {
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
            let p: Piece = board.getPiece(new Coordinate(i, j));
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
                img.setAttribute("style", "position: fixed; left: " + i * size / 8 + "px" + "; bottom: " + j * size / 8 + "px" + "; width: " + size / 8 + "px" + "; height:" + size / 8 + "px");
                document.body.appendChild(img);
            }
        }
    }
}