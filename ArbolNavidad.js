var activeObjectArbolNavidad;
class ArbolNavidad{
    constructor() {
        this.selector = 0;
        activeObjectArbolNavidad = this; 
        activeObjectArbolNavidad.luzamarilla = [];
        this.arrayColores = ["yellow", "red", "blue"];
   
    }

    muestra(idDiv) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");;
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        var rect1 = activeObjectArbolNavidad.crearRectanguloSvg({ x: 60, y: 600, ancho: 380 / 2, alto: 48 });
        var rect2 = activeObjectArbolNavidad.crearRectanguloSvg({ x: 255, y: 600, ancho: 380 / 2, alto: 48 });
        var st = "activeObjectArbolNavidad.clickEnArbol('EE')";
        var et = "activeObjectArbolNavidad.clickEnRectanguloA('r1','EE')";
        var kt = "activeObjectArbolNavidad.clickEnRectanguloB('r2')";



        svg.setAttribute("height", 650);
        svg.setAttribute("width", 500);
        svg.setAttribute("id", "EE");
        polygon.setAttribute("fill", '#409040');
        polygon.setAttribute("points", '250, 60 100, 400 120, 400 80, 500 100, 500 60, 600 440, 600 400, 500 420, 500 380, 400 400, 400');
        polygon.setAttribute("stroke", "black");
        polygon.setAttribute("stroke-width", 3);
        polygon.setAttribute("onclick", st);
        rect1.setAttribute("id", "r1");
        rect1.setAttribute("onclick", et);
        rect2.setAttribute("id", "r2");
        rect2.setAttribute("onclick", kt);
        rect2.setAttribute("fill", "yellow");

        svg.appendChild(rect1);
        svg.appendChild(rect2)
        svg.appendChild(polygon);
        document.getElementById(idDiv).appendChild(svg); 
    }
    crearRectanguloSvg({ x, y, ancho, alto }) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("height", alto);
        rect.setAttribute("width", ancho);

        rect.setAttribute("fill", "gray");
        rect.setAttribute("stroke-width", 2);
        rect.setAttribute("stroke", "black");
        return rect;
      }
    clickEnArbol(id) {
        
         activeObjectArbolNavidad.ponerLuz(event.clientX, event.clientY, id);
        this.luzamarilla.push({ x: event.clientX, y: event.clientY, color: activeObjectArbolNavidad.arrayColores[activeObjectArbolNavidad.selector], circuito: (this.luzamarilla.length % 3) +1 });
         console.log(this.luzamarilla);
        
    }
    
    clickEnRectanguloA(id,idsvg) {
        let p = document.getElementById(id);
        if (p.getAttribute("fill") == "gray"){
            p.setAttribute("fill", "yellow");
            activeObjectArbolNavidad.parpadearLuz(idsvg);
        }
        else{
            p.setAttribute("fill", "gray");
            activeObjectArbolNavidad.clearIntervals();
            activeObjectArbolNavidad.prenderLuces(idsvg);
        }
        
    }
    clickEnRectanguloB(id) {
        
        this.selector++;
        if (this.selector > 2) {
            this.selector = 0;
        }
        var t = this.arrayColores[this.selector];
        let p = document.getElementById(id);
        p.setAttribute("fill", t);
        
       
      
    }
    ponerLuz(x, y, id) {
        var contador = this.luzamarilla.length;
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 9);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", 2);
        circle.setAttribute("fill", activeObjectArbolNavidad.arrayColores[activeObjectArbolNavidad.selector]);
        circle.setAttribute("id", contador);
        circle.setAttribute("visibility", "display");
        circle.setAttribute("num", (this.luzamarilla.length % 3) +1);
        circle.setAttribute("onclick", "activeObjectArbolNavidad.clickLuces(id)");
        var a = document.getElementById(id);

        a.appendChild(circle);
       
    }
    clickLuces(idCirculo) {
        var p = document.getElementById(idCirculo);
        
        if (p.hasChildNodes()) {
            return;
        } else {
        var animation = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animation.setAttribute("atributeType", "XML");
        animation.setAttribute("attributeName", "r");
        animation.setAttribute("from", "9");
        animation.setAttribute("to", "14");
        animation.setAttribute("dur", "2");
        animation.setAttribute("repeatCount", "indefinite");
        p.appendChild(animation);
        }
        
     
        

    }
    prenderLuces(idsvg) {
        var p = document.getElementById(idsvg);
        var id1 = p.querySelectorAll('[estado="on"]');
       

        setTimeout(() => {
            for (var i = 0; i < id1.length; i++) {
                id1[i].setAttribute("visibility", "display");
            }
        }, 1000);
        for (var i = 0; i < id1.length; i++) {
            id1[i].setAttribute("estado", "off"); 
        }
        id1.forEach((a) => a.removeChild(a.childNodes[0]));
        
        
    }
    clearIntervals() {
        activeObjectArbolNavidad.Intervals.forEach((a) => clearInterval(a));
    }
    parpadearLuz(id) {
        var p = document.getElementById(id);
        var a, b, c;
        //definición de los selectores agrupados de cada id
        var id1 = p.querySelectorAll('[num="1"]');
        var id2 = p.querySelectorAll('[num="2"]');
        var id3 = p.querySelectorAll('[num="3"]');
        //intervalos
        a = setInterval(() => {
            for (var i = 0; i < id1.length; i++) {
                id1[i].setAttribute("visibility", "hidden");  
                id1[i].setAttribute("estado", "on");
            }
            setTimeout(() => {
                for (var i = 0; i < id1.length; i++) {
                    id1[i].setAttribute("visibility", "display");    
                }
                }, 400);
        }, 800);  
        
        b = setInterval(() => {
            for (var i = 0; i < id2.length; i++) {
                id2[i].setAttribute("visibility", "hidden"); 
                id2[i].setAttribute("estado", "on");
            }
            setTimeout(() => {
                for (var i = 0; i < id2.length; i++) {
                    id2[i].setAttribute("visibility", "display");    
                }
                }, 600);
        }, 1200); 
        
        c = setInterval(() => {
            for (var i = 0; i < id3.length; i++) {
                id3[i].setAttribute("visibility", "hidden");  
                id3[i].setAttribute("estado", "on");
            }
            setTimeout(() => {
                for (var i = 0; i < id3.length; i++) {
                    id3[i].setAttribute("visibility", "display");    
                }
                }, 1000);
            }, 2000); 
        
        activeObjectArbolNavidad.Intervals = [a, b, c];

    }
  
}

