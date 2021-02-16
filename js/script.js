// jshint esversion:6

function* spiral(num) {
    let ling_initiale = 0, ligne_finale = num - 1;
    let col_initiale = 0, col_finale = num - 1;
    let conteur = 1;
    while (ling_initiale <= ligne_finale && col_initiale <= col_finale) {
      // Ligne supperieure
      for (let i = col_initiale; i <= ligne_finale; i++) {
        yield { 'row': ling_initiale, 'col': i, 'counter': conteur };
        conteur++;
      }
      ling_initiale++;
  
      // Construction de la dernière colonne
      for (let i = ling_initiale; i <= ligne_finale; i++) {
        yield { 'col': col_finale, 'row': i, 'counter': conteur };
        conteur++;
      }
      col_finale--;
  
      // Ici j'ai construit la ligne inférieure
      if (ling_initiale <= ligne_finale) {
        for (let i = col_finale; i >= col_initiale; i--) {
          yield { 'row': ligne_finale, 'col': i, 'counter': conteur };
          conteur++;
        }
        ligne_finale--;
      }
  
      if (col_initiale <= col_finale) {
        // Imprimer la premiere colonne vers le haut
        for (let i = ligne_finale; i >= ling_initiale; i--) {
          yield { 'col': col_initiale, 'row': i, 'counter': conteur };
          conteur++;
        }
        col_initiale++;
      }
    }// La fin de la boucle while
    

  }// Fin de la construction du spirale

function select_diag(){

}//Fin de la fonction selectionner diagonal
  // Fonction pour Tailler les Grids
  function sizeGrid() {
    const container = document.querySelector('#container');
    let portMultiplier = 100;
    if (Math.round(window.window.innerWidth) < 1023) portMultiplier = 50;
    container.style.width = num * portMultiplier + 'px';
  }
  
  // Fonction pour Contruire les Grids
  function makeGrid(num) {
    const container = document.querySelector('#container');
    // Supression de Child précédent
    while (container.lastChild) container.removeChild(container.lastChild);
    // Appel de la taille
    sizeGrid();
    // Il s'agit du css dynamique afin de construire notre grid matricielle
    container.style.gridTemplateColumns = 'auto '.repeat(num).trim();
    //Entendons ce grid matricielle
    const total = num * num;
    for (let i = 0; i < num; i++) {
      for (let item = -1; item < num - 1; item++) {
        const el = document.createElement('div');
        let col = item + 1;
        el.classList.add('grid-item');
        el.setAttribute('data-row', i);
        el.setAttribute('data-col', col);
        container.append(el);
      }
    }
    document.querySelectorAll('button').forEach((b) => {
      b.removeAttribute('disabled');
    });
  }
  // Fin de la Fonction pour Contruire les Grids
  
  function doNext(next, time = false) {
    if (time) {
      setTimeout(function () {
        document.querySelector(`[data-row="${next.row}"][data-col="${next.col}"]`).innerText = next.counter;
      }, time);
    } else {
      document.querySelector(`[data-row="${next.row}"][data-col="${next.col}"]`).innerText = next.counter;
    }
  }
  
  // Generation de la spirale
  let num, spiralGen, next;
  const gridSelect = document.querySelector('#grid-select');
  gridSelect.addEventListener('change', (event) => {
    num = event.target.value;
    makeGrid(num);
    spiralGen = spiral(num);
  });
  
  document.querySelector('#next').addEventListener('click', (event) => {
    next = spiralGen.next().value;
    doNext(next);
  });
  document.querySelector('#finish').addEventListener('click', (event) => {
    const time = 1000;
    let i = 1;
    while (next = spiralGen.next().value) {
      doNext(next, time * i);
      i++;
    }
  });
  
  const container = document.querySelector('#container');
  let boxes = document.querySelectorAll('.grid-item');
  
  window.addEventListener('load', () => {
    num = 4;
    makeGrid(num);
    spiralGen = spiral(num);
  });
  window.addEventListener('resize', () => {
    sizeGrid();
  });