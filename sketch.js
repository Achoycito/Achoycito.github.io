function setup() {
    createCanvas(windowWidth, windowHeight);
    circ1X = width / 4;
    circ2X = width / 2;
    circ3X = (width / 4) * 3;
    circY = height / 2;
    r = 150;
}

function draw() {
    background(245, 245, 255);

    textSize(20);
    text("Punto pendiente", width*0.25, height*0.80);
    text("Algoritmo DDA", width*0.50, height*0.80);
    text("Bresenham", width*0.75, height*0.80);

    stroke(100, 40, 100);
    strokeWeight(2);
    
    circuloPuntoMedio(circ1X, circY, r);
    circuloPuntoMedio(circ2X, circY, r);
    circuloPuntoMedio(circ3X, circY, r);

    n = parseInt(prompt("Escribe en cuántas partes se va a dividir el círculo: "));
    angle = 2 * PI / n;

    for (let i = 0; i < n; i++) {
        let xLinea = circ1X + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        lineaPuntoPendiente(circ1X, circY, xLinea, yLinea);
    }
    for (let i = 0; i < n; i++) {
        let xLinea = circ2X + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        lineaDDA(circ2X, circY, xLinea, yLinea);
    }
    for (let i = 0; i < n; i++) {
        let xLinea = circ3X + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        lineaBresenham(circ3X, circY, xLinea, yLinea);
    }

    

    noLoop();
}




function circuloPuntoMedio(x, y, radio) {
    let xAux = 0;
    let yAux = radio;
    let d = 1 - radio;

    while (xAux <= yAux) {
        point(x + xAux, y + yAux);
        point(x + yAux, y + xAux);
        point(x - xAux, y + yAux);
        point(x - yAux, y + xAux);
        point(x + xAux, y - yAux);
        point(x + yAux, y - xAux);
        point(x - xAux, y - yAux);
        point(x - yAux, y - xAux);

        if (d < 0) {
            d += 2 * xAux + 3;
        } else {
            d += 2 * (xAux - yAux) + 5;
            yAux--;
        }
        xAux++;
    }
}



function lineaPuntoPendiente(x1, y1, x2, y2) {
    aumentoX = 0;

    if (x1 > x2)
        aumentoX = -1;
    else if (x1 < x2)
        aumentoX = 1;

    if (x1 === x2) {
        x = x1;

        if (y1 > y2) {
            aumentoY = -1;
        }
        else {
            aumentoY = 1;
        }

        if (aumentoY == 1) {
            for (var y = y1; y < y2; y += aumentoY) {
                point(x, y);
            }
        }
        else {
            for (var y = y1; y > y2; y += aumentoY) {
                point(x, y);
            }
        }

    }
    else {
        m = (y2 - y1) / (x2 - x1);
        b = y1 - (m * x1);
        if (aumentoX == 1) {
            for (var x = x1; x < x2; x += aumentoX) {
                y = (m * x) + b;
                point(x, y);
            }
        }
        else {
            for (var x = x1; x > x2; x += aumentoX) {
                y = (m * x) + b;
                point(x, y);
            }
        }
    }
}



function lineaDDA(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let pasos = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let aumentoX = dx / pasos;
    let m = dy / pasos;
    let x = x1;
    let y = y1;

    for (let i = 0; i <= pasos; i++) {
        point(x, y);
        x += aumentoX;
        y += m;
    }
}



function lineaBresenham(x1, y1, x2, y2) {
    let dx = abs(x2 - x1);
    let dy = abs(y2 - y1);
    let aumentoX = (x1 < x2) ? 1 : -1;
    let aumentoY = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    if (aumentoX == 1) {
        if (aumentoY == 1) {
            while (x1 <= x2 && y1 <= y2) {
                point(x1, y1);
                let e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x1 += aumentoX;
                }
                if (e2 < dx) {
                    err += dx;
                    y1 += aumentoY;
                }
            }
        }
        else if (aumentoY == -1) {
            while (x1 <= x2 && y1 >= y2) {
                point(x1, y1);
                let e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x1 += aumentoX;
                }
                if (e2 < dx) {
                    err += dx;
                    y1 += aumentoY;
                }
            }
        }
    }
    else if (aumentoX == -1) {
        if (aumentoY == 1) {
            while (x1 >= x2 && y1 <= y2) {
                point(x1, y1);
                let e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x1 += aumentoX;
                }
                if (e2 < dx) {
                    err += dx;
                    y1 += aumentoY;
                }
            }
        }
        else if (aumentoY == -1) {
            while (x1 >= x2 && y1 >= y2) {
                point(x1, y1);
                let e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x1 += aumentoX;
                }
                if (e2 < dx) {
                    err += dx;
                    y1 += aumentoY;
                }
            }
        }
    }
}