document.addEventListener("DOMContentLoaded", function() {
    const characters = document.querySelectorAll('.character');
    let positions = [0, 1, 2]; // Indices die de huidige posities van Mario, Luigi, Toad aangeven
  
    document.getElementById('prev').addEventListener('click', function() {
      // Roteer de posities naar links
      positions.unshift(positions.pop()); // Haal het laatste element en plaats het aan het begin
      updatePositions();
    });
  
    document.getElementById('next').addEventListener('click', function() {
      // Roteer de posities naar rechts
      positions.push(positions.shift()); // Haal het eerste element en plaats het aan het einde
      updatePositions();
    });
  
    function updatePositions() {
      // Update de class van elk karakter om de nieuwe positie te reflecteren
      characters.forEach((character, index) => {
        character.style.order = positions[index]; // Gebruik de CSS 'order' eigenschap om de volgorde te beheren
      });
    }
  });
  