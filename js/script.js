// jshint esversion:6

function* spiral(num) {
    let ligneInitiale = 0, ligneFinale = num - 1;
    let colonneInitiale = 0, colonneFinale = num - 1;
    let compteur = 1;
    while (ligneInitiale <= ligneFinale && colonneInitiale <= colonneFinale) {
      // Ligne supperieure
      for (let i = colonneInitiale; i <= ligneFinale; i++) {
        yield { 'row': ligneInitiale, 'col': i, 'counter': compteur };
        compteur++;
      }
      ligneInitiale++;
  
      // Construction de la dernière colonne
      for (let i = ligneInitiale; i <= ligneFinale; i++) {
        yield { 'col': colonneFinale, 'row': i, 'counter': compteur };
        compteur++;
      }
      colonneFinale--;
  
      // Ici j'ai construit la ligne inférieure
      if (ligneInitiale <= ligneFinale) {
        for (let i = colonneFinale; i >= colonneInitiale; i--) {
          yield { 'row': ligneFinale, 'col': i, 'counter': compteur };
          compteur++;
        }
        ligneFinale--;
      }
  
      if (colonneInitiale <= colonneFinale) {
        // Imprimer la premiere colonne vers le haut
        for (let i = ligneFinale; i >= ligneInitiale; i--) {
          yield { 'col': colonneInitiale, 'row': i, 'counter': compteur };
          compteur++;
        }
        colonneInitiale++;
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
  
  function doNext(next, temps = false) {
    if (temps) {
      settempsout(function () {
        document.querySelector(`[data-row="${next.row}"][data-col="${next.col}"]`).innerText = next.counter;
      }, temps);
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
    const temps = 500;
    let i = 1;
    while (next = spiralGen.next().value) {
      doNext(next, temps * i);
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